const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/addPizza", async (req, res) => {
  let { name, price, image, toppings } = req.body;
  image = "src/assets/image/" + image + ".jpg";
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const insertPizzaQuery =
      "INSERT INTO pizzas (name, price, image) VALUES (?, ?, ?)";
    const [result] = await connection.query(insertPizzaQuery, [
      name,
      price,
      image,
    ]);
    const pizzaId = result.insertId;

    const insertToppingPromises = toppings.map(async (topping) => {
      const findToppingIdQuery = "SELECT id FROM toppings WHERE name = ?";
      const [toppingResult] = await connection.query(findToppingIdQuery, [
        topping,
      ]);

      if (!toppingResult[0]) {
        throw new Error(`Topping not found: ${topping}`);
      }

      const insertToppingQuery =
        "INSERT INTO pizzaToppings (pizzaId, toppingId) VALUES (?, ?)";
      await connection.query(insertToppingQuery, [
        pizzaId,
        toppingResult[0].id,
      ]);
    });

    await Promise.all(insertToppingPromises);

    await connection.commit();
    res.status(200).json({
      message: "Pizza added successfully",
      pizzaId: pizzaId,
    });
  } catch (error) {
    console.error("Error adding pizza:", error);
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
