import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubRoomT, ClubBuildingEnum } from "src/drizzle/schema/club.schema";
import { eq, and, desc, lte, gte, isNull, or } from "drizzle-orm";
import { takeUnique } from "src/common/util/util";

@Injectable()
export class ClubRoomTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findClubLocationById(
    clubId: number,
  ): Promise<{ room: number; buildingName: string }> {
    const currentDate = new Date();

    const roomDetails = await this.db
      .select({
        room: ClubRoomT.roomLocation,
        buildingName: ClubBuildingEnum.buildingName,
      })
      .from(ClubRoomT)
      .leftJoin(
        ClubBuildingEnum,
        eq(ClubRoomT.clubBuildingEnum, ClubBuildingEnum.id),
      )
      .where(
        and(
          eq(ClubRoomT.clubId, clubId),
          lte(ClubRoomT.startTerm, currentDate),
          or(gte(ClubRoomT.endTerm, currentDate), isNull(ClubRoomT.endTerm)),
        ),
      )
      .orderBy(desc(ClubRoomT.createdAt))
      .limit(1)
      .then(takeUnique);

    return roomDetails;
  }
}
