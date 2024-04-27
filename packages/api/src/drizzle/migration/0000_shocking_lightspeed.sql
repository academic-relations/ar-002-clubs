CREATE TABLE `employee` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `employee_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_t` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`start_term` datetime,
	`end_term` datetime,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `employee_t_id` PRIMARY KEY(`id`),
	CONSTRAINT `employee_t_employee_id_unique` UNIQUE(`employee_id`)
);
--> statement-breakpoint
CREATE TABLE `executive` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`student_id` int,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `executive_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `executive_bureau_enum` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `executive_bureau_enum_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `executive_status_enum` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `executive_status_enum_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `executive_t` (
	`id` int AUTO_INCREMENT NOT NULL,
	`executive_id` int,
	`executive_status_enum` int,
	`executive_bureau_enum` int,
	`start_term` datetime,
	`end_term` datetime,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `executive_t_id` PRIMARY KEY(`id`),
	CONSTRAINT `executive_t_executive_id_unique` UNIQUE(`executive_id`)
);
--> statement-breakpoint
CREATE TABLE `professor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `professor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professor_enum` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `professor_enum_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professor_t` (
	`id` int AUTO_INCREMENT NOT NULL,
	`professor_id` int,
	`professor_enum` int,
	`department` int,
	`start_term` datetime,
	`end_term` datetime,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `professor_t_id` PRIMARY KEY(`id`),
	CONSTRAINT `professor_t_professor_id_unique` UNIQUE(`professor_id`)
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `student_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_enum` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `student_enum_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_status_enum` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `student_status_enum_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_t` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int,
	`student_enum` int NOT NULL,
	`student_status_enum` int NOT NULL,
	`number` int,
	`department` int,
	`semester_id` int,
	`start_term` datetime,
	`end_term` datetime,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `student_t_id` PRIMARY KEY(`id`),
	CONSTRAINT `student_t_student_id_unique` UNIQUE(`student_id`),
	CONSTRAINT `student_t_number_unique` UNIQUE(`number`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sid` varchar(255),
	`name` varchar(255),
	`email` varchar(255),
	`phone_number` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` datetime,
	`deleted_at` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_sid_unique` UNIQUE(`sid`)
);
--> statement-breakpoint
ALTER TABLE `employee` ADD CONSTRAINT `employee_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_t` ADD CONSTRAINT `employee_t_employee_id_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `executive` ADD CONSTRAINT `executive_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `executive_t` ADD CONSTRAINT `executive_t_executive_id_executive_id_fk` FOREIGN KEY (`executive_id`) REFERENCES `executive`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `professor` ADD CONSTRAINT `professor_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `professor_t` ADD CONSTRAINT `professor_t_professor_id_professor_id_fk` FOREIGN KEY (`professor_id`) REFERENCES `professor`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student` ADD CONSTRAINT `student_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student_t` ADD CONSTRAINT `student_t_student_id_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;