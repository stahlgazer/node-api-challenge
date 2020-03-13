const express = require("express");
const server = express();
const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.use(express.json());
server.use(logger);
server.get("/", (request, response) => {
  response.send(`<h2>Node Sprint Challenge 1</h2>`);
});


// custom middleware
function logger(request, response, next) {
    const method = request.method;
    const endpoint = request.originalUrl;
    console.log(`logger: ${method} to ${endpoint}`);
    next();
  }

module.exports = server;