const express = require("express");
const fs = require("fs");
const router = express.Router();

const dbPath = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET /users
router.get("/", (req, res) => {
  const users = readDB();
    //console.log("GET /users called. Current users:", users);
  res.json(users);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const users = readDB();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST /users
router.post("/", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const users = readDB();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

const lastId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;

const newUser = {
  id: lastId + 1,
  name,
  email,
  age: age ?? null,
};


  users.push(newUser);
  writeDB(users);
  res.status(201).json(newUser);
});

// PUT /users/:id
router.put("/:id", (req, res) => {
  const { name, email, age } = req.body;
  const id = parseInt(req.params.id);
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const users = readDB();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  if (users.some(u => u.email === email && u.id !== id)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  users[index] = { id, name, email, age: age ?? null };
  writeDB(users);
  res.json(users[index]);
});

// PATCH /users/:id
router.patch("/:id", (req, res) => {
  const { name, email, age } = req.body;
  const id = parseInt(req.params.id);

  const users = readDB();
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (email && users.some(u => u.email === email && u.id !== id)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;

  writeDB(users);
  res.json(user);
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const users = readDB();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1)[0];
  writeDB(users);
  res.json(deletedUser);
});

module.exports = router;
