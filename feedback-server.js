const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());

let feedbackData = null;

function loadFeedback() {
  try {
    const feedbackPath = path.join(__dirname, "feedback_mock.json");
    const data = fs.readFileSync(feedbackPath, "utf-8");
    feedbackData = JSON.parse(data);
  } catch (error) {
    console.error("Virhe ladattaessa palautetta:", error);
    feedbackData = [];
  }
}

app.get("/palaute", (req, res) => {
  res.status(200).json(feedbackData);
});

app.get("/palaute/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const feedback = feedbackData.find((item) => item.id === id);

  if (!feedback) {
    return res.status(400).json({
      error: "Palautetta ei löydy",
    });
  }

  res.status(200).json(feedback);
});

app.post("/palaute/uusi", (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({
      error: "Puuttuvia kenttiä: name, email, feedback vaaditaan",
    });
  }

  const newFeedback = {
    id: Math.max(...feedbackData.map((f) => f.id), 0) + 1,
    name,
    email,
    feedback,
  };

  feedbackData.push(newFeedback);

  res.status(200).json({
    message: "Palaute lisätty onnistuneesti",
    data: newFeedback,
  });
});

app.put("/palaute/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, feedback } = req.body;

  const feedbackItem = feedbackData.find((item) => item.id === id);

  if (!feedbackItem) {
    return res.status(400).json({
      error: "Palautetta ei löydy",
    });
  }

  if (name !== undefined) feedbackItem.name = name;
  if (email !== undefined) feedbackItem.email = email;
  if (feedback !== undefined) feedbackItem.feedback = feedback;

  res.status(200).json({
    message: "Palaute päivitetty onnistuneesti",
    data: feedbackItem,
  });
});

app.delete("/palaute/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = feedbackData.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(400).json({
      error: "Palautetta ei löydy",
    });
  }

  const deletedFeedback = feedbackData.splice(index, 1)[0];

  res.status(200).json({
    message: "Palaute poistettu onnistuneesti",
    data: deletedFeedback,
  });
});

loadFeedback();
app.listen(PORT, () => {
  console.log(`REST-palvelin käynnissä: http://localhost:${PORT}`);
  console.log(`Palautteita ladattu: ${feedbackData.length} kpl`);
});
