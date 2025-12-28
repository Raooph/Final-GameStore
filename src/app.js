const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "f40d210066494ecfbba32ff5b312d384";
const BASE_URL = "https://api.rawg.io/api";

app.get("/api/games", async (req, res) => {
  try {
    const { search, genre, page = 1 } = req.query;
    let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=12`;

    if (search) url += `&search=${search}`;
    if (genre) url += `&genres=${genre}`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
