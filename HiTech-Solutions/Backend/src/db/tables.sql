-- Création de la table Roles

--- Add "AUTO_INCREMENT" in primary Key ---
CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Création de la table Sections
CREATE TABLE Sections (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Création de la table Users
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Role INT,
    Id_Section INT,
    Name VARCHAR(255) NOT NULL,
    Surname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Tel VARCHAR(20),
    DateInscription DATE,
    DateDeFin DATE,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_Role) REFERENCES Roles(Id),
    FOREIGN KEY (Id_Section) REFERENCES Sections(Id)
);

-- Création de la table Courses
CREATE TABLE Courses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Section INT,
    Name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_Section) REFERENCES Sections(Id)
);

-- Création de la table Services
CREATE TABLE Services (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_User INT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Photo VARCHAR(255),
    FOREIGN KEY (Id_User) REFERENCES Users(Id)
);

-- Création de la table TeachersCourses
CREATE TABLE TeachersCourses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_course INT,
    Id_User INT,
    FOREIGN KEY (Id_course) REFERENCES Courses(Id),
    FOREIGN KEY (Id_User) REFERENCES Users(Id)
);

-- Création de la table CreationTests
CREATE TABLE CreationTests (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_User INT,
    Id_course INT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    DateTest DATE,
    Validation ENUM('Yes', 'No'),
    FOREIGN KEY (Id_User) REFERENCES Users(Id),
    FOREIGN KEY (Id_course) REFERENCES Courses(Id)
);
