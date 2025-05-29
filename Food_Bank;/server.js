const express = require('express');
const path = require('path');
const cors = require('cors'); 

const { fetchFoodBankData } = require('./db'); 

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/foodbank', async (req, res) => {
    try {
      const data = await fetchFoodBankData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
