# REST-palvelin – Palaute

Pieni REST-palvelin palautteen hallintaa varten. Data ladataan `feedback_mock.json`-tiedostosta ja pidetään muistissa.

## Käynnistäminen

```bash
node feedback-server.js
```

Palvelin käynnistyy osoitteeseen **http://localhost:3001**

## API-endpointit

### GET /palaute

Palauttaa kaiken annetun palautteen.

**Esimerkki:**

```bash
curl http://localhost:3001/palaute
```

**Vastaus (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Fannie Mougel",
    "email": "fmougel0@stanford.edu.invalid",
    "feedback": "Suspendisse potenti..."
  },
  ...
]
```

---

### GET /palaute/:id

Palauttaa tietyn palautteen.

**Esimerkki:**

```bash
curl http://localhost:3001/palaute/1
```

**Vastaus (200 OK):**

```json
{
  "id": 1,
  "name": "Fannie Mougel",
  "email": "fmougel0@stanford.edu.invalid",
  "feedback": "Suspendisse potenti..."
}
```

**Vastaus (400 ERROR) – jos palautetta ei löydy:**

```json
{
  "error": "Palautetta ei löydy"
}
```

---

### POST /palaute/uusi

Lisää uuden palautteen.

**Esimerkki:**

```bash
curl -X POST http://localhost:3001/palaute/uusi \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Anssi Ahonen",
    "email": "anssi@example.com",
    "feedback": "Erittäin hyvää palvelua!"
  }'
```

**Vastaus (200 OK):**

```json
{
  "message": "Palaute lisätty onnistuneesti",
  "data": {
    "id": 11,
    "name": "Anssi Ahonen",
    "email": "anssi@example.com",
    "feedback": "Erittäin hyvää palvelua!"
  }
}
```

**Vastaus (400 ERROR) – jos kenttiä puuttuu:**

```json
{
  "error": "Puuttuvia kenttiä: name, email, feedback vaaditaan"
}
```

---

### PUT /palaute/:id

Muokkaa tietyn palautteen sisältöä.

**Esimerkki:**

```bash
curl -X PUT http://localhost:3001/palaute/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Päivitetty Nimi",
    "feedback": "Päivitetty palaute"
  }'
```

**Vastaus (200 OK):**

```json
{
  "message": "Palaute päivitetty onnistuneesti",
  "data": {
    "id": 1,
    "name": "Päivitetty Nimi",
    "email": "fmougel0@stanford.edu.invalid",
    "feedback": "Päivitetty palaute"
  }
}
```

**Vastaus (400 ERROR) – jos palautetta ei löydy:**

```json
{
  "error": "Palautetta ei löydy"
}
```

---

### DELETE /palaute/:id

Poistaa tietyn palautteen.

**Esimerkki:**

```bash
curl -X DELETE http://localhost:3001/palaute/1
```

**Vastaus (200 OK):**

```json
{
  "message": "Palaute poistettu onnistuneesti",
  "data": {
    "id": 1,
    "name": "Fannie Mougel",
    "email": "fmougel0@stanford.edu.invalid",
    "feedback": "Suspendisse potenti..."
  }
}
```

**Vastaus (400 ERROR) – jos palautetta ei löydy:**

```json
{
  "error": "Palautetta ei löydy"
}
```

---

## Testaus Postmanilla

1. Avaa Postman
2. Tuo kokoelma: **Palaute-REST-API.postman_collection.json**
3. Testaa kaikki endpointit

## Tärkeää

- **Data on muistissa** – muutoksia ei kirjoiteta takaisin `feedback_mock.json`-tiedostoon
- **Ohjelman sammuttamisen jälkeen** data palaa alkuperäiseen tilaan
- Status 200 = onnistuneet operaatiot + muokattu data
- Status 400 = virhe
