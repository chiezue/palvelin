CREATE DATABASE IF NOT EXISTS DB_KARAMELLI;
USE DB_KARAMELLI;

CREATE TABLE Tuote (
  tuote_id INT AUTO_INCREMENT PRIMARY KEY,
  nimi VARCHAR(100),
  hinta DECIMAL(6,2),
  paino INT,
  tuoteseloste TEXT
);

CREATE TABLE Asiakas (
  asiakas_id INT AUTO_INCREMENT PRIMARY KEY,
  nimi VARCHAR(100),
  osoite VARCHAR(200),
  email VARCHAR(100)
);

CREATE TABLE Tilaus (
  tilaus_id INT AUTO_INCREMENT PRIMARY KEY,
  asiakas_id INT,
  pvm DATE,
  FOREIGN KEY (asiakas_id) REFERENCES Asiakas(asiakas_id)
);

CREATE TABLE Tilausrivi (
  tilausrivi_id INT AUTO_INCREMENT PRIMARY KEY,
  tilaus_id INT,
  tuote_id INT,
  maara INT,
  FOREIGN KEY (tilaus_id) REFERENCES Tilaus(tilaus_id),
  FOREIGN KEY (tuote_id) REFERENCES Tuote(tuote_id)
);

INSERT INTO Tuote (nimi, hinta, paino, tuoteseloste) VALUES
('Kismet', 1.50, 55, 'Suklaapatukka'),
('Fazerina', 2.00, 60, 'Appelsiinitäytesuklaa'),
('Geisha', 1.80, 50, 'Hasselpähkinätäytesuklaa');

INSERT INTO Asiakas (nimi, osoite, email) VALUES
('Maija Meikäläinen', 'Katu 1, Helsinki', 'maija@email.com'),
('Teppo Testaaja', 'Testitie 2, Espoo', 'teppo@email.com');

INSERT INTO Tilaus (asiakas_id, pvm) VALUES
(1, '2026-03-29'),
(2, '2026-03-28');

INSERT INTO Tilausrivi (tilaus_id, tuote_id, maara) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 5);

SHOW TABLES;
SELECT * FROM Tuote;
SELECT * FROM Asiakas;
SELECT * FROM Tilaus;
SELECT * FROM Tilausrivi;