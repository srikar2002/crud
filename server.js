const express = require("express");
const app = express();
const usersRouter = require("./users");

app.use(express.json());
app.use("/users", usersRouter);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found go to /users" });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
