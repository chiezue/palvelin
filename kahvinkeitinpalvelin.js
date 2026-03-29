
const express = require("express");
const app = express();

const path = require("path");
const PORT = 3002;

// Palvele juurihakemiston kahvinkeitin.js, jos sitä pyydetään
app.get("/kahvinkeitin.js", (req, res) => {
  res.sendFile(path.join(__dirname, "kahvinkeitin.js"));
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/kahvinkeitin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "kahvinkeitin.html"));
});

let isMachineOn = false;

function makeCoffee() {
  return new Promise((resolve, reject) => {
    console.log("Starting the coffee machine...");

    setTimeout(() => {
      if (isMachineOn) {
        resolve("☕ Coffee is ready!");
      } else {
        reject("🚫 Coffee machine is off. Please turn it on.");
      }
    }, 2000);
  });
}

app.get("/set/on", (req, res) => {
  isMachineOn = true;
  res.status(200).json({
    status: "success",
    message: "Coffee machine turned ON",
    machineStatus: isMachineOn,
  });
});

app.get("/set/off", (req, res) => {
  isMachineOn = false;
  res.status(200).json({
    status: "success",
    message: "Coffee machine turned OFF",
    machineStatus: isMachineOn,
  });
});

app.get("/switch", (req, res) => {
  isMachineOn = !isMachineOn;
  const state = isMachineOn ? "ON" : "OFF";
  res.status(200).json({
    status: "success",
    message: `Coffee machine switched to ${state}`,
    machineStatus: isMachineOn,
  });
});

app.get("/coffee", (req, res) => {
  makeCoffee()
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: result,
        machineStatus: isMachineOn,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error,
        machineStatus: isMachineOn,
      });
    });
});

app.get("/status", (req, res) => {
  res.status(200).json({
    status: "success",
    machineStatus: isMachineOn,
    isOn: isMachineOn,
  });
});

app.listen(PORT, () => {
  console.log(
    `☕ Kahvinkeittimen REST-palvelin käynnissä: http://localhost:${PORT}`,
  );
  console.log(`Keittimen tila: ${isMachineOn ? "ON" : "OFF"}`);
});
