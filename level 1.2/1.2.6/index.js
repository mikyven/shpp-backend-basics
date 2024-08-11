const express = require("express");
const app = express();
const port = 3000;

let count = 0;

app.get("/", (_req, res) => {
  res.send("Hello");
});

app.get("/counter", (req, res) => {
  res.send(`${count}`);
  count++;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
