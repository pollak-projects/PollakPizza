const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/allsizes", (req, res) => {
  const query = `
        SELECT *
        FROM size 
    `;

  db.query(query)
    .then((results) => {
      res.json(results[0]);
    })
    .catch((err) => {
      console.error("Database query error:", err); // Log the error
      res.status(500).json({ error: "Hiba a méretek lekérdezése során." });
    });
});

module.exports = router;
