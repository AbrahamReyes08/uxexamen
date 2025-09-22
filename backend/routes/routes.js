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

module.exports = router;
