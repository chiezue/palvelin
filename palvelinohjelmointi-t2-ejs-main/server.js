import express from "express";

// Luodaan express-palvelin instanssi
const app = express();

// Otetaan käyttöön EJS-moottori
app.set("view engine", "ejs");
app.set("views", "templates");

// Määritellään staattiset kansiot
app.use("/tyylit", express.static("includes/styles"));
app.use(express.static("public")); // Näin /images/ kansio toimii

// Määritellään vakiot
const port = 3000;
const host = "localhost";

// Etusivu, osa A: tervehdys parametrin mukaan
app.get("/", (req, res) => {
  const nimi = req.query.nimi; // haetaan URL-parametri ?nimi=...
  const tervehdys = nimi ? `Terve, ${nimi}` : "Terve, vierailija";

  res.render("index", { tervehdys });
});

// Kissa-sivu, osa B: dynaamisesti kuvat kansiosta
app.get("/kissat", (req, res) => {
  // Lista kaikista kuvatiedostoista public/images-kansiossa
  const kissat = ["cat1.png", "cat2.png"]; // Lisää tänne kaikki kuvat, joita haluat näyttää
  res.render("kissat", { kissat });
});

// Käynnistetään palvelin
app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
