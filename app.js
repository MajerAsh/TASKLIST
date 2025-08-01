import express from "express";
const app = express();
export default app;
import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";
import getUserFromToken from "./middleware/getUserFromToken.js"; //.js"

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// Handle common Postgres errors
app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

//final catch-all error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
