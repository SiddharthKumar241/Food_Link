// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectDB, insertLocation, findNearby } = require('../Food_Link/models/db.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

app.post('/store-location', async (req, res) => {
  const { userId, name, latitude, longitude, role } = req.body;
  if (!userId || !name || !latitude || !longitude || !role) {
    return res.status(400).json({ error: "Missing fields: userId, name, latitude, longitude, role required" });
  }
  try {
    const collectionName = role === 'donor' ? 'donors' : 'receiver';
    await insertLocation(userId, name, latitude, longitude, collectionName);
    res.json({ message: `Location stored for ${role} ${name}` });
  } catch (err) {
    res.status(500).json({ error: "Error storing location", details: err.message });
  }
});

app.get('/nearby-donors', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat or lon query param" });
  try {
    const donors = await findNearby('donors', parseFloat(lat), parseFloat(lon));
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/nearby-needy', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat or lon query param" });
  try {
    const needy = await findNearby('receiver', parseFloat(lat), parseFloat(lon));
    res.json(needy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'rajo.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'results.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
