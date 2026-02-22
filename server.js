const express = require("express");
const app = express();
const PORT = 3000;

// Lomakedatan käsittely
app.use(express.urlencoded({ extended: true }));

// Staattiset tiedostot
app.use(express.static("public"));

// GET /palaute → näyttää lomakkeen
app.get("/palaute", (req, res) => {
  res.sendFile(__dirname + "/public/palaute.html");
});

// POST /palaute → vastaa tekstillä
app.post("/palaute", (req, res) => {
  const { nimi, sahkoposti } = req.body;

  res.send(
    `Kiitos palautteestasi, ${nimi}! Otamme sinuun tarvittaessa yhteyttä sähköpostitse osoitteeseen ${sahkoposti}.`,
  );
});

app.listen(PORT, () => {
  console.log(`Serveri käynnissä: http://localhost:${PORT}`);
});
