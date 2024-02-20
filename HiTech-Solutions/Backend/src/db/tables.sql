CREATE TABLE Users (
    Id INT PRIMARY KEY,
    Nom VARCHAR(255),
    Prenom VARCHAR(255),
    Email VARCHAR(255),
    Role VARCHAR(255),
    Tel VARCHAR(255),
    Section VARCHAR(255),
    DateInscription DATE,
    DateDeFin DATE,
    Password VARCHAR(255),
    Fk_Id_Role INT,
    Fk_Id_Section INT,
    FOREIGN KEY (Fk_Id_Role) REFERENCES Roles(Id),
    FOREIGN KEY (Fk_Id_Section) REFERENCES Section(Id)
);

CREATE TABLE Roles (
    Id INT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Section (
    Id INT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Services (
    Id INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Photo VARCHAR(255),
    Id_Admin INT,
    Fk_Id_Roles INT,
    FOREIGN KEY (Fk_Id_Roles) REFERENCES Roles(Id)
);

CREATE TABLE Courses (
    Id INT PRIMARY KEY,
    Id_Section INT,
    Name VARCHAR(255),
    Fk_Id_Section INT,
    FOREIGN KEY (Fk_Id_Section) REFERENCES Section(Id)
);
