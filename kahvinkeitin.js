// Kahvinkeitin käyttöliittymän JavaScript
const api = "http://localhost:3002";
function updateStatus() {
  fetch(api + "/status")
    .then((r) => r.json())
    .then((data) => {
      document.getElementById("status").textContent =
        "Keittimen tila: " + (data.isOn ? "PÄÄLLÄ" : "POIS PÄÄLTÄ");
    });
}
function setOn() {
  fetch(api + "/set/on").then(updateStatus);
  document.getElementById("result").textContent = "";
}
function setOff() {
  fetch(api + "/set/off").then(updateStatus);
  document.getElementById("result").textContent = "";
}
function toggle() {
  fetch(api + "/switch").then(updateStatus);
  document.getElementById("result").textContent = "";
}
function makeCoffee() {
  document.getElementById("result").textContent = "Kahvia keitetään...";
  fetch(api + "/coffee")
    .then((r) => r.json())
    .then((data) => {
      if (data.status === "success") {
        document.getElementById("result").textContent = data.message;
      } else {
        document.getElementById("result").textContent = data.message;
      }
      updateStatus();
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Virhe yhteydessä palvelimeen.";
    });
}
updateStatus();
