//import express from "express"; this previously heled npm run dev but yolo
import app from "#app";
import db from "#db/client";

//put all middleware into app.js: import routes/users, routes/tracks and mdl/getUseFromToken

const PORT = process.env.PORT ?? 3000; // changed || to ?? per jukebox_pro answr

await db.connect();

//moved all app.use to app.js

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
