import { Injectable, Inject } from "@nestjs/common";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import { eq, gte, lte, and, count, gt, lt, isNull, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  RentalEnum,
  RentalObject,
  RentalOrder,
  RentalOrderItemD,
} from "src/drizzle/schema/rental.schema";
import { Student } from "src/drizzle/schema/user.schema";

// 나중에 수정이 필요할 수 있음.
function getRentalOrderStatus(
  createdAt?: Date,
  startDate?: Date,
  endDate?: Date,
): RentalOrderStatusEnum {
  const currentDate = new Date();
  if (createdAt && createdAt < currentDate) {
    return RentalOrderStatusEnum.Applied;
  }
  if (startDate && !endDate) {
    return RentalOrderStatusEnum.Rented;
  }
  return RentalOrderStatusEnum.Returned;
}

@Injectable()
export class RentalServiceRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async createRental(
    studentId,
    clubId,
    objects,
    purpose,
    desiredStart,
    desiredEnd,
    studentPhoneNumber,
  ) {
    // 필요한 수의 객체가 있는지 확인
    const availableObjects = await this.getAvailableObjects(
      objects,
      desiredStart,
      desiredEnd,
    ); // matchingObjects : {rentalEnumId: int, objectId: int}[]

    // request의 object 들 중 사용 가능하지 않은 것이 하나라도 있는 경우 오류 발생
    if (availableObjects.includes(false)) {
      return false;
    }

    await this.db.transaction(async tx => {
      // RentalOrder에 삽입
      const [result] = await tx.insert(RentalOrder).values({
        studentId,
        clubId,
        studentPhoneNumber,
        purpose,
        desiredStart,
        desiredEnd,
      });

      const rentalOrderId = result.insertId;

      // RentalOrderItemD에 매칭되는 객체 삽입
      await Promise.all(
        availableObjects.map(async obj => {
          await tx.insert(RentalOrderItemD).values({
            rentalOrderId,
            objectId: obj.objectId,
          });
        }),
      );
    });
    return true;
  }

  private async getAvailableObjects(objects, desiredStart, desiredEnd) {
    // 각 obj에 대해 비동기 작업을 병렬로 수행
    const matchingObjects = await Promise.all(
      objects.map(async obj => {
        // RentalObject와 RentalOrderItemD 테이블을 조인하여 조건에 맞는 레코드 선택
        const results = await this.db
          .select({
            rentalEnumId: RentalObject.rentalEnum, // rentalEnumId 컬럼 선택
            objectId: RentalObject.id,
            desiredStart: RentalOrder.desiredStart, // startTerm 컬럼 선택
            desiredEnd: RentalOrder.desiredEnd, // endTerm 컬럼 선택
          })
          .from(RentalObject) // RentalObject 테이블로부터
          .leftJoin(
            RentalOrderItemD,
            eq(RentalObject.id, RentalOrderItemD.objectId),
          ) // RentalOrderItemD와 조인
          .leftJoin(
            RentalOrder,
            eq(RentalOrderItemD.rentalOrderId, RentalOrder.id),
          )
          .where(
            and(
              eq(RentalObject.rentalEnum, obj.id), // rentalEnum이 obj.rentalEnumId와 같은 조건
              or(
                lt(RentalOrder.desiredEnd, desiredStart), // 대여하는 물건의 desiredStart가 종료 날짜보다 큰 조건
                gt(RentalOrder.desiredStart, desiredEnd),
              ),
              isNull(RentalObject.deletedAt), // RentalObject의 deletedAt이 null인 조건
              isNull(RentalOrder.deletedAt), // RentalOrder의 deletedAt이 null인 조건
            ),
          )
          .limit(obj.number); // 최대 obj.number 만큼의 레코드를 제한

        // 결과의 개수가 obj.number보다 적은 경우 false 반환
        if (results.length < obj.number) {
          return false;
        }
        return results;
      }),
    );

    // 2차원 배열을 1차원 배열로 평탄화
    return matchingObjects.flat();
  }

  // 1. 동아리의 특정 기간 내의 모든 주문 건을 찾습니다.
  async getRentals(
    clubId,
    pageOffset,
    itemCount,
    startDate?: Date,
    endDate?: Date,
  ) {
    const startIndex = (pageOffset - 1) * itemCount + 1;
    const rentals = await this.db
      .select({
        id: RentalOrder.id,
        studentName: Student.name,
        studentPhoneNumber: RentalOrder.studentPhoneNumber,
        object: {
          id: RentalEnum.id,
          name: RentalEnum.typeName,
          count: count(RentalEnum.id),
        },
        startDate: RentalOrderItemD.startTerm,
        endDate: RentalOrderItemD.endTerm,
        createdAt: RentalOrder.createdAt,
      })
      .from(RentalOrder)
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrderItemD.rentalOrderId, RentalOrder.id),
      )
      .leftJoin(RentalObject, eq(RentalObject.id, RentalOrderItemD.objectId))
      .leftJoin(RentalEnum, eq(RentalEnum.id, RentalObject.rentalEnum))
      .leftJoin(Student, eq(Student.id, RentalOrder.studentId))
      .where(
        and(
          eq(RentalOrder.clubId, clubId),
          startDate ? gte(RentalOrderItemD.startTerm, startDate) : undefined,
          endDate ? lte(RentalOrderItemD.endTerm, endDate) : undefined,
        ),
      )
      .groupBy(
        RentalOrder.id,
        RentalEnum.id,
        RentalOrderItemD.startTerm,
        RentalOrderItemD.endTerm,
      )
      .limit(itemCount)
      .offset(startIndex - 1);

    const transformedRentals = rentals.reduce((acc, rental) => {
      const existingRental = acc.find(
        r =>
          r.id === rental.id &&
          r.studentName === rental.studentName &&
          r.studentPhoneNumber === rental.studentPhoneNumber &&
          r.startDate === rental.startDate &&
          r.endDate === rental.endDate &&
          r.createdAt === rental.createdAt,
      );

      if (existingRental) {
        existingRental.objects.push(rental.object);
      } else {
        acc.push({
          id: rental.id,
          studentName: rental.studentName,
          studentPhoneNumber: rental.studentPhoneNumber,
          statusEnum: getRentalOrderStatus(
            rental.createdAt,
            rental.startDate,
            rental.endDate,
          ),
          startDate: rental.startDate,
          endDate: rental.endDate,
          objects: [rental.object],
        });
      }

      return acc;
    }, []);
    return transformedRentals;
  }
}
