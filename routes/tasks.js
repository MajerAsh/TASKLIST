import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByUser,
  updateTask,
} from "#db/queries/tasks";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

const router = express.Router();
export default router;

router.use(requireUser); // 🔒 protect all below routes

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const task = await createTask(req.body.title, req.body.done, req.user.id);
  res.status(201).send(task);
});

router.get("/", async (req, res) => {
  const tasks = await getTasksByUser(req.user.id);
  res.send(tasks);
});

router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
  const task = await getTaskById(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  if (task.user_id !== req.user.id) return res.status(403).send("Forbidden");

  const updated = await updateTask(task.id, req.body.title, req.body.done);
  res.send(updated);
});

router.delete("/:id", async (req, res) => {
  const task = await getTaskById(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  if (task.user_id !== req.user.id) return res.status(403).send("Forbidden");

  await deleteTask(task.id);
  res.sendStatus(204);
});
