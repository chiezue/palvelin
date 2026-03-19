const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tiedosto = "loki.txt";

console.log("1) Lue tiedosto");
console.log("2) Lisää rivi");

rl.question("Valitse toiminto (1 tai 2): ", (valinta) => {
  if (valinta === "1") {
    fs.readFile(tiedosto, "utf8", (err, data) => {
      if (err) {
        console.log("Tiedostoa ei voitu lukea tai se ei ole olemassa.");
      } else {
        console.log("\nTiedoston sisältö:\n");
        console.log(data);
      }
      rl.close();
    });
  } else if (valinta === "2") {
    rl.question("Kirjoita lisättävä rivi: ", (rivi) => {
      fs.writeFile(tiedosto, rivi + "\n", { flag: "a+" }, (err) => {
        if (err) {
          console.log("Virhe kirjoitettaessa tiedostoon.");
        } else {
          console.log("Rivi lisätty tiedostoon.");
        }
        rl.close();
      });
    });
  } else {
    console.log("Virheellinen valinta.");
    rl.close();
  }
});
