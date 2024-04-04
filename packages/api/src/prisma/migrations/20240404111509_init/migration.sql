-- CreateTable
CREATE TABLE `test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `student_enum` INTEGER NOT NULL,
    `student_status_enum` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `department` INTEGER NOT NULL,
    `semester_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `StudentT_student_id_key`(`student_id`),
    UNIQUE INDEX `StudentT_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentStatusEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Executive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `student_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExecutiveT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `executive_id` INTEGER NOT NULL,
    `executive_status_enum` INTEGER NOT NULL,
    `executive_bureau_enum` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ExecutiveT_executive_id_key`(`executive_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExecutiveStatusEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExecutiveBureauEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfessorT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `professor_id` INTEGER NOT NULL,
    `professor_enum` INTEGER NOT NULL,
    `department` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ProfessorT_professor_id_key`(`professor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfessorEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `EmployeeT_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Club` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `division_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `founding_year` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Club_name_key`(`name`),
    UNIQUE INDEX `Club_division_id_key`(`division_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `club_status_enum_id` INTEGER NOT NULL,
    `characteristic_kr` VARCHAR(191) NOT NULL,
    `characteristic_en` VARCHAR(191) NOT NULL,
    `advisor` VARCHAR(191) NULL,
    `advisor_mail` VARCHAR(191) NULL,
    `semester_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubStatusEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubStudentT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `club_id` INTEGER NOT NULL,
    `semester_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubRoomT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `club_id` INTEGER NOT NULL,
    `club_building_enum` INTEGER NOT NULL,
    `room_location` INTEGER NULL,
    `room_password` VARCHAR(191) NULL,
    `semester_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ClubRoomT_club_id_key`(`club_id`),
    UNIQUE INDEX `ClubRoomT_club_building_enum_key`(`club_building_enum`),
    UNIQUE INDEX `ClubRoomT_semester_id_key`(`semester_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubBuildingEnum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ClubBuildingEnum_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubRepresentativeD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `club_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `club_representative_enum` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `ClubRepresentativeD_club_id_key`(`club_id`),
    UNIQUE INDEX `ClubRepresentativeD_student_id_key`(`student_id`),
    UNIQUE INDEX `ClubRepresentativeD_club_representative_enum_key`(`club_representative_enum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubRepresentativeEnum` (
    `enum_id` INTEGER NOT NULL AUTO_INCREMENT,
    `enum_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`enum_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SemesterD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `District_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Division` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `district_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Division_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DivisionPresidentD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `division_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `originated_club_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DivisionPermanentClubD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `club_id` INTEGER NOT NULL,
    `start_term` DATETIME(3) NOT NULL,
    `end_term` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `DivisionPermanentClubD_club_id_key`(`club_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentT` ADD CONSTRAINT `StudentT_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentT` ADD CONSTRAINT `StudentT_student_status_enum_fkey` FOREIGN KEY (`student_status_enum`) REFERENCES `StudentStatusEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentT` ADD CONSTRAINT `StudentT_student_enum_fkey` FOREIGN KEY (`student_enum`) REFERENCES `StudentEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Executive` ADD CONSTRAINT `Executive_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExecutiveT` ADD CONSTRAINT `ExecutiveT_executive_id_fkey` FOREIGN KEY (`executive_id`) REFERENCES `Executive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExecutiveT` ADD CONSTRAINT `ExecutiveT_executive_status_enum_fkey` FOREIGN KEY (`executive_status_enum`) REFERENCES `ExecutiveStatusEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExecutiveT` ADD CONSTRAINT `ExecutiveT_executive_bureau_enum_fkey` FOREIGN KEY (`executive_bureau_enum`) REFERENCES `ExecutiveBureauEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessorT` ADD CONSTRAINT `ProfessorT_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessorT` ADD CONSTRAINT `ProfessorT_professor_enum_fkey` FOREIGN KEY (`professor_enum`) REFERENCES `ProfessorEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeT` ADD CONSTRAINT `EmployeeT_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Club` ADD CONSTRAINT `Club_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubT` ADD CONSTRAINT `ClubT_club_status_enum_id_fkey` FOREIGN KEY (`club_status_enum_id`) REFERENCES `ClubStatusEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubT` ADD CONSTRAINT `ClubT_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `SemesterD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubT` ADD CONSTRAINT `ClubT_id_fkey` FOREIGN KEY (`id`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubStudentT` ADD CONSTRAINT `ClubStudentT_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubStudentT` ADD CONSTRAINT `ClubStudentT_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubStudentT` ADD CONSTRAINT `ClubStudentT_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `SemesterD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRoomT` ADD CONSTRAINT `ClubRoomT_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRoomT` ADD CONSTRAINT `ClubRoomT_club_building_enum_fkey` FOREIGN KEY (`club_building_enum`) REFERENCES `ClubBuildingEnum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRoomT` ADD CONSTRAINT `ClubRoomT_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `SemesterD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRepresentativeD` ADD CONSTRAINT `ClubRepresentativeD_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRepresentativeD` ADD CONSTRAINT `ClubRepresentativeD_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubRepresentativeD` ADD CONSTRAINT `ClubRepresentativeD_club_representative_enum_fkey` FOREIGN KEY (`club_representative_enum`) REFERENCES `ClubRepresentativeEnum`(`enum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Division` ADD CONSTRAINT `Division_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `District`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DivisionPresidentD` ADD CONSTRAINT `DivisionPresidentD_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `Division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DivisionPresidentD` ADD CONSTRAINT `DivisionPresidentD_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DivisionPresidentD` ADD CONSTRAINT `DivisionPresidentD_originated_club_id_fkey` FOREIGN KEY (`originated_club_id`) REFERENCES `Club`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DivisionPermanentClubD` ADD CONSTRAINT `DivisionPermanentClubD_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
