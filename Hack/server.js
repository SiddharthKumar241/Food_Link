const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { insertLocation } = require('./db');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/store-location', async (req, res) => {
    const { userId, name, latitude, longitude } = req.body;
    if (!userId || !name || !latitude || !longitude) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    await insertLocation(userId, name, latitude, longitude);
    res.json({ message: "Location stored successfully" });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
