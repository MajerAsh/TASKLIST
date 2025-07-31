import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createTask } from "#db/queries/tasks";
import bcrypt from "bcrypt";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const password = await bcrypt.hash("password123", 10);
  const user = await createUser("alice", password);
  await createTask("Finish homework", false, user.id);
  await createTask("Buy groceries", true, user.id);
  await createTask("Call mom", false, user.id);
}
