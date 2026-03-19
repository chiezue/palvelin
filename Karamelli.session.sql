CREATE DATABASE IF NOT EXISTS DB_KARAMELLI;
USE DB_KARAMELLI;
CREATE TABLE Tuote (
  tuote_id INT AUTO_INCREMENT PRIMARY KEY,
  nimi VARCHAR(100),
  hinta DECIMAL(6,2),
  paino INT,
  tuoteseloste TEXT
);

INSERT INTO Tuote (nimi, hinta, paino, tuoteseloste)
VALUES ('Kismet', 1.50, 55, 'Suklaapatukka');

SHOW TABLES;
SELECT * FROM Tuote;