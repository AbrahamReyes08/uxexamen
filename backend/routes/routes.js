const express = require("express");
const router = express.Router();
const { pool } = require("../db"); // 👈 CommonJS; ruta relativa desde /routes

// prueba de vida
router.get("/test", (_req, res) => {
  res.json({ message: "API is working!" });
});

router.post("/register", async (req, res) => {
  res.json({ message: "User registration endpoint" });
});

router.post("/login", async (req, res) => {
  res.json({ message: "User login endpoint" });
});

router.get("/tours", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const sql = "SELECT * FROM tours LIMIT $1 OFFSET $2";
  try {
    const result = await pool.query(sql, [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/tours/availability", async (req, res) => {
  const sql =
    "SELECT * FROM toursApp.tour_schedules WHERE schedule_time > NOW() AND seats_available > 0";
  try {
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tour availability:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/tours/reserve", async (req, res) => {
  const sql =
    "INSERT INTO toursApp.reservations (tour_schedule_id, user_id, num_seats) VALUES ($1, $2, $3) RETURNING *";
  const { tour_schedule_id, user_id, num_seats } = req.body;

  try {
    const result = await pool.query(sql, [
      tour_schedule_id,
      user_id,
      num_seats,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
