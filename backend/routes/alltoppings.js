const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/alltoppings', (req, res) => {
    const query = `
        SELECT *
        FROM toppings 
    `;

    db.query(query)
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      console.error('Database query error:', err); // Log the error
      res.status(500).json({ error: 'Hiba a rátétek lekérdezése során.' });
    });
});


module.exports = router;
