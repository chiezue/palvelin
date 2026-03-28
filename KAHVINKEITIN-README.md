# ☕ Kahvinkeittimen REST-palvelin

Express-pohjainen REST-palvelin, joka simuloi kahvinkeittimen käyttäytymistä promiseja käyttäen.

## Käynnistäminen

```bash
node kahvinkeitinpalvelin.js
```

Palvelin käynnistyy osoitteeseen **http://localhost:3002**

---

## API-endpointit

### GET /status

Palauttaa kahvinkeittimen nykyisen tilan.

**Vastaus:**

```json
{
  "status": "success",
  "machineStatus": false,
  "isOn": false
}
```

---

### GET /set/on

Laittaa kahvinkeittimen päälle.

**Vastaus:**

```json
{
  "status": "success",
  "message": "Coffee machine turned ON",
  "machineStatus": true
}
```

---

### GET /set/off

Laittaa kahvinkeittimen pois päältä.

**Vastaus:**

```json
{
  "status": "success",
  "message": "Coffee machine turned OFF",
  "machineStatus": false
}
```

---

### GET /switch

Vaihtaa kahvinkeittimen tilaa (ON ↔ OFF).

**Vastaus (kone oli pois päältä):**

```json
{
  "status": "success",
  "message": "Coffee machine switched to ON",
  "machineStatus": true
}
```

---

### GET /coffee

Palauttaa kahvin kahden sekunnin kuluttua, jos keitin on päällä.

**Vastaus (200 OK, jos keitin ON):**

```json
{
  "status": "success",
  "message": "☕ Coffee is ready!",
  "machineStatus": true
}
```

**Vastaus (400 ERROR, jos keitin OFF):**

```json
{
  "status": "error",
  "message": "🚫 Coffee machine is off. Please turn it on.",
  "machineStatus": false
}
```

---

## Testausesimerkit

### Testaa PowerShellissä

```powershell
# Tarkista tila
Invoke-WebRequest -Uri "http://localhost:3002/status" -UseBasicParsing

# Laita keitin päälle
Invoke-WebRequest -Uri "http://localhost:3002/set/on" -UseBasicParsing

# Hae kahvia (odottaa 2 sekuntia)
Invoke-WebRequest -Uri "http://localhost:3002/coffee" -UseBasicParsing

# Laita pois päältä
Invoke-WebRequest -Uri "http://localhost:3002/set/off" -UseBasicParsing

# Vaihda tilaa
Invoke-WebRequest -Uri "http://localhost:3002/switch" -UseBasicParsing
```

### Testaa cURLilla

```bash
# Hae kahvi ennen kytkin-painallusta
curl http://localhost:3002/coffee

# Laita päälle
curl http://localhost:3002/set/on

# Hae kahvi (valmistuu 2 sekunnissa)
curl http://localhost:3002/coffee
```

---

## Tekniset yksityiskohdat

- **Promise-pohjainen:** `makeCoffee()`-funktio käyttää promiseja
- **Asynkroninen:** Kahvin valmistus simuloidaan `setTimeout`-komennolla
- **Tilatila:** Keittimen tila pidetään muistissa (`isMachineOn`)
- **JSON-vastaukset:** Kaikki vastaukset JSON-muodossa

## Koodi - makeCoffee Promise

```javascript
function makeCoffee() {
  return new Promise((resolve, reject) => {
    console.log("Starting the coffee machine...");

    setTimeout(() => {
      if (isMachineOn) {
        resolve("☕ Coffee is ready!");
      } else {
        reject("🚫 Coffee machine is off. Please turn it on.");
      }
    }, 2000); // 2 sekuntia
  });
}
```
