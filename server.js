import express from "express";
import app from "#app";
import db from "#db/client";

import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";
import getUserFromToken from "./middleware/getUserFromToken.js"; //.js"

const PORT = process.env.PORT ?? 3000; // changed || to ?? per jukebox_pro answr

await db.connect();

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
