const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to fetch all pizzas
router.get('/allPizzas', async (req, res) => {
  const { toppings: selectedtops } = req.query;
  const { pizzaname: searchedpizza } = req.query;
  let query = "";
  
  // Case: Both selectedtops and searchedpizza are null
  if (!selectedtops && !searchedpizza) {
    query = `
    SELECT p.id, p.name, p.price, p.image, GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
    FROM pizzas p
    LEFT JOIN pizzaToppings pt ON p.id = pt.pizzaId
    LEFT JOIN toppings t ON pt.toppingId = t.id
    WHERE p.id >= 1
    GROUP BY p.id, p.name, p.price, p.image
    `;
    try {
      const [results] = await db.query(query);
      return res.json(results); // Return immediately to stop execution
    } catch (err) {
      console.error("Error fetching pizzas:", err);
      return res.status(500).json({ error: "Error fetching pizzas" });
    }
  }
  if(selectedtops && searchedpizza)
  {
    let toppingsArray = selectedtops.split(";");
  
    let Finaltops = [];
    for (let index = 0; index < toppingsArray.length; index++) {
      let top = toppingsArray[index].split(",");
      Finaltops = Finaltops.concat(top);
    }
  
    const placeholders = Finaltops.map(() => "?").join(",");
    const query =`
    SELECT p.id, p.name, p.price, p.image, GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
FROM pizzas p
LEFT JOIN pizzaToppings pt ON p.id = pt.pizzaId
LEFT JOIN toppings t ON pt.toppingId = t.id
WHERE LOWER(p.name) LIKE LOWER(?) -- Szűrés a névre
  AND p.id IN (
    SELECT pt.pizzaId
    FROM pizzaToppings pt
    WHERE pt.toppingId IN (${placeholders}) -- Szűrés a kiválasztott topping ID-kre
    GROUP BY pt.pizzaId
    HAVING COUNT(DISTINCT pt.toppingId) = ?
  )
GROUP BY p.id, p.name, p.price, p.image
ORDER BY p.id;
`
const params = [`%${searchedpizza}%`,...Finaltops, Finaltops.length];
  

try {
  const [results] = await db.query(query, params);
  return res.json(results); // Return immediately
} catch (err) {
  console.error("Error fetching pizzas:", err);
  return res.status(500).json({ error: "Error fetching pizzas" });
}

  }
  // Case: Search by toppings
  if (selectedtops) {
    let toppingsArray = selectedtops.split(";");
  
    let Finaltops = [];
    for (let index = 0; index < toppingsArray.length; index++) {
      let top = toppingsArray[index].split(",");
      Finaltops = Finaltops.concat(top);
    }
  
    const placeholders = Finaltops.map(() => "?").join(",");
    query = `
      SELECT p.id, p.name, p.price, p.image, GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
      FROM pizzas p
      LEFT JOIN pizzaToppings pt ON p.id = pt.pizzaId
      LEFT JOIN toppings t ON pt.toppingId = t.id
      WHERE p.id IN (
        SELECT pt.pizzaId
        FROM pizzaToppings pt
        WHERE pt.toppingId IN (${placeholders}) -- Filter by the selected toppings
        GROUP BY pt.pizzaId
        HAVING COUNT(DISTINCT pt.toppingId) = ?
      )
      GROUP BY p.id, p.name, p.price, p.image
      ORDER BY p.id;
    `;
  
    const params = [...Finaltops, Finaltops.length];
  
    try {
      const [results] = await db.query(query, params);
      return res.json(results); 
    } catch (err) {
      console.error("Error fetching pizzas:", err);
      return res.status(500).json({ error: "Error fetching pizzas" });
    }
  }
  
  // Case: Search by pizzaname
  if (searchedpizza) {
    query = `
SELECT 
    p.id AS id,
    p.name AS name,
    p.price AS price,
    p.image AS image,
    GROUP_CONCAT(t.name SEPARATOR ', ') AS toppings
FROM 
    pizzas p
LEFT JOIN 
    pizzaToppings pt ON p.id = pt.pizzaId
LEFT JOIN 
    toppings t ON pt.toppingId = t.id
WHERE 
    LOWER(p.name) LIKE LOWER(?)
GROUP BY 
    p.id, p.name, p.price, p.image;

    `;
  
    const params = [`%${searchedpizza}%`]; 
  
    try {
      const [results] = await db.query(query, params);
      console.log(results)
      return res.json(results); 
    } catch (err) {
      console.error("Error fetching pizzas:", err);
      return res.status(500).json({ error: "Error fetching pizzas" });
    }
  }
});

// Update pizza
router.put('/updatePizza/:id', async (req, res) => {
  const { name, price, image, toppings } = req.body;
  const { id } = req.params;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const updatePizzaQuery = 'UPDATE pizzas SET name = ?, price = ?, image = ? WHERE id = ?';
    await connection.query(updatePizzaQuery, [name, price, image, id]);

    const deleteToppingsQuery = 'DELETE FROM pizzaToppings WHERE pizzaId = ?';
    await connection.query(deleteToppingsQuery, [id]);

    const insertToppingPromises = toppings.map(async (topping) => {
      const findToppingIdQuery = 'SELECT id FROM toppings WHERE name = ?';
      const [toppingResult] = await connection.query(findToppingIdQuery, [topping]);

      if (!toppingResult[0]) {
        throw new Error(`Topping not found: ${topping}`);
      }

      const insertToppingQuery = 'INSERT INTO pizzaToppings (pizzaId, toppingId) VALUES (?, ?)';
      await connection.query(insertToppingQuery, [id, toppingResult[0].id]);
    });

    await Promise.all(insertToppingPromises);

    await connection.commit();
    res.status(200).json({ message: 'Pizza updated successfully' });
  } catch (error) {
    console.error('Error updating pizza:', error);
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});


// Delete pizza
router.delete('/deletePizza/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteToppingsQuery = 'DELETE FROM pizzaToppings WHERE pizzaId = ?';
    const deletePizzaQuery = 'DELETE FROM pizzas WHERE id = ?';

    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    await connection.query(deleteToppingsQuery, [id]);
    await connection.query(deletePizzaQuery, [id]);

    await connection.commit();
    connection.release();
    
    res.status(200).json({ message: 'Pizza deleted successfully' });
  } catch (error) {
    console.error('Error deleting pizza:', error);
    await connection.rollback();
    res.status(500).json({ error: 'Error deleting pizza' });
  }
});

// Fetch all toppings
router.get('/allToppings', async (req, res) => {
  const connection = await db.getConnection();

  try {
    const query = 'SELECT id, name, bonusPrice FROM toppings';
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching toppings:', error);
    res.status(500).json({ error: 'Error fetching toppings' });
  } finally {
    connection.release();
  }
});

module.exports = router;
