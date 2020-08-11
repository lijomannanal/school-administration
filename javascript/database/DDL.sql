-- `school-administration-system`.classes definition

CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classCode` varchar(255) NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `classCode` (`classCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.students definition

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentEmail` varchar(255) NOT NULL,
  `studentName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studentEmail` (`studentEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.subjects definition

CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectCode` varchar(255) NOT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subjectCode` (`subjectCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.teachers definition

CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacherEmail` varchar(255) NOT NULL,
  `teacherName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacherEmail` (`teacherEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.studentClasses definition

CREATE TABLE `studentClasses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studentClasses_class_id_student_id_unique` (`student_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `studentClasses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `studentClasses_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.teacherSubjects definition

CREATE TABLE `teacherSubjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacher_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacherSubjects_subject_id_teacher_id_unique` (`teacher_id`,`subject_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `teacherSubjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacherSubjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- `school-administration-system`.teacherStudents definition

CREATE TABLE `teacherStudents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_class_id` int DEFAULT NULL,
  `teacher_subject_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacherStudents_teacher_subject_id_student_class_id_unique` (`student_class_id`,`teacher_subject_id`),
  KEY `teacher_subject_id` (`teacher_subject_id`),
  CONSTRAINT `teacherStudents_ibfk_1` FOREIGN KEY (`student_class_id`) REFERENCES `studentClasses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacherStudents_ibfk_2` FOREIGN KEY (`teacher_subject_id`) REFERENCES `teacherSubjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
