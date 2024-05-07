import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubRoomT, ClubBuildingEnum } from "src/drizzle/schema/club.schema";
import { eq, desc } from "drizzle-orm";

const takeUniqueOrThrow = <T>(values: T[]): T => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0];
};

@Injectable()
export class ClubRoomTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findClubLocationById(
    clubId: number,
  ): Promise<{ room: number; buildingName: string }> {
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
      .where(eq(ClubRoomT.clubId, clubId))
      .orderBy(desc(ClubRoomT.createdAt))
      .limit(1)
      .then(takeUniqueOrThrow);

    return roomDetails;
  }
}
