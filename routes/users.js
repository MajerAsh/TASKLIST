import express from "express";
import bcrypt from "bcrypt";
import { createToken } from "#utils/jwt";
import { createUser, getUserByUsername } from "#db/queries/users";
import requireBody from "#middleware/requireBody";

const router = express.Router();
export default router;

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    // Check if user exists
    const existing = await getUserByUsername(username);
    if (existing) return res.status(400).send("Username already taken");

    //hash and cr8. hashedpassword or hashed?
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);
    //TOKEN
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  }
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).send("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send("Invalid credentials");

    const token = createToken({ id: user.id });
    res.send(token);
  }
);
