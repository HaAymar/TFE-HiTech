-- -- Création de la table Roles

-- --- Add "AUTO_INCREMENT" in primary Key ---
-- CREATE TABLE Roles (
--     Id INT AUTO_INCREMENT PRIMARY KEY,
--     Name VARCHAR(255) NOT NULL
-- );

-- -- Création de la table Users
-- CREATE TABLE Users (
--     Id INT AUTO_INCREMENT PRIMARY KEY,
--     Id_Role INT,
--     Id_Section INT,
--     Name VARCHAR(255) NOT NULL,
--     Surname VARCHAR(255) NOT NULL,
--     Email VARCHAR(255) NOT NULL,
--     Tel VARCHAR(20),
--     DateInscription DATE,
--     DateDeFin DATE,
--     Password VARCHAR(255) NOT NULL,
--     FOREIGN KEY (Id_Role) REFERENCES Roles(Id),
--     FOREIGN KEY (Id_Section) REFERENCES Sections(Id)
-- );

-- -- Création de la table Courses
-- CREATE TABLE `Courses` (
--   `Id` INT NOT NULL AUTO_INCREMENT,
--   `Id_Formation` INT,
--   `Name` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`Id`),
--   FOREIGN KEY (`Id_Formation`) REFERENCES `Formations`(`Id`)
-- );

-- -- Création de la table Formations
-- CREATE TABLE `Formations` (
--   `Id` INT NOT NULL AUTO_INCREMENT,
--   `Id_User` INT,
--   `Name` VARCHAR(255) NOT NULL,
--   `Description` TEXT,
--   `Photo` VARCHAR(255),
--   PRIMARY KEY (`Id`),
--   FOREIGN KEY (`Id_User`) REFERENCES `Users`(`Id`)
-- );

-- -- Création de la table TeachersCourses
-- CREATE TABLE `TeachersCourses` (
--   `Id` INT NOT NULL AUTO_INCREMENT,
--   `Id_course` INT,
--   `Id_User` INT,
--   PRIMARY KEY (`Id`),
--   FOREIGN KEY (`Id_course`) REFERENCES `Courses`(`Id`),
--   FOREIGN KEY (`Id_User`) REFERENCES `Users`(`Id`)
-- );

-- -- Création de la table `CreationTests`
-- CREATE TABLE `CreationTests` (
--   `Id` INT NOT NULL AUTO_INCREMENT,
--   `Id_course` INT,
--   `Name` VARCHAR(255) NOT NULL,
--   `Description` TEXT,
--   `DateTest` DATE,
--   `Validation` BOOLEAN NOT NULL,
--   PRIMARY KEY (`Id`),
--   FOREIGN KEY (`Id_course`) REFERENCES `Courses`(`Id`)
-- );

-- Users Table


----  Nouvelles tables --------------
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Tel VARCHAR(20),
    Password VARCHAR(255)
);

-- Roles Table
CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);

-- Admins Table
CREATE TABLE Admins (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_role INT,
    Id_userId INT,
    FOREIGN KEY (Id_role) REFERENCES Roles(Id),
    FOREIGN KEY (Id_userId) REFERENCES Users(Id)
);

-- Teachers Table
CREATE TABLE Teachers (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_role INT,
    Id_userId INT,
    FOREIGN KEY (Id_role) REFERENCES Roles(Id),
    FOREIGN KEY (Id_userId) REFERENCES Users(Id)
);

-- Students Table
CREATE TABLE Students (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_userId INT,
    Id_role INT,
    DateInscription DATE,
    DateFin DATE,
    FOREIGN KEY (Id_userId) REFERENCES Users(Id),
    FOREIGN KEY (Id_role) REFERENCES Roles(Id)
);

-- Formations Table
CREATE TABLE Formations (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Photo VARCHAR(255)
);

-- Students_Formation Table
CREATE TABLE Students_Formation (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_student INT,
    Id_formation INT,
    FOREIGN KEY (Id_student) REFERENCES Students(Id),
    FOREIGN KEY (Id_formation) REFERENCES Formations(Id)
);

-- Courses Table
CREATE TABLE Courses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Id_Formation INT,
    FOREIGN KEY (Id_Formation) REFERENCES Formations(Id)
);

-- TeachersCourses Table
CREATE TABLE TeachersCourses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_course INT,
    Id_Teacher INT,
    FOREIGN KEY (Id_Teacher) REFERENCES Teachers(Id),
    FOREIGN KEY (Id_course) REFERENCES Courses(Id)
);

-- CreationTests Table
CREATE TABLE CreationTests (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Teacher INT,
    Id_course INT,
    Name VARCHAR(255),
    DateTest DATE,
    Description TEXT,
    Cotation TEXT,
    Validation ENUM('Yes', 'No') DEFAULT 'No',
    FOREIGN KEY (Id_Teacher) REFERENCES Teachers(Id),
    FOREIGN KEY (Id_course) REFERENCES Courses(Id)
);

-- Tests Table
CREATE TABLE Tests (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_creatTest INT,
    Id_student INT,
    Id_teacher INT,
    Score INT,
    Validation ENUM('Yes', 'No') DEFAULT 'No',
    FOREIGN KEY (Id_creatTest) REFERENCES CreationTests(Id),
    FOREIGN KEY (Id_student) REFERENCES Students(Id),
    FOREIGN KEY (Id_teacher) REFERENCES Teachers(Id)
);
