require("dotenv").config();
const express = require("express");
const server = express();
server.use(express.json());


server.get("/", (req, res) => {
  res.send(`<h2>Let's write some endpoints!</h2>`);
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});