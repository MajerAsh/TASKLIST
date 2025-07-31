import db from "#db/client";

//always been first
export async function createUser(username, hashedPassword) {
  const {
    rows: [user],
  } = await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, hashedPassword]
  );
  return user;
}
//always 2nd
export async function getUserByUsername(username) {
  const {
    rows: [user],
  } = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return user;
}
//always 3rd
export async function getUserById(id) {
  const {
    rows: [user],
  } = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return user;
}
