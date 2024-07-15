const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let messages = [];

app.get("/", sendMessage);
app.get("/clear", clearMessages);
app.get("/send/:message", receiveMessage);

app.listen(3000);

function sendMessage(req, res) {
  res.send(JSON.stringify(messages));
}

function receiveMessage(req, res) {
  let message = req.params.message;
  messages.push(message);
  res.send("Successfully your message ( " + message + ")");
}

function clearMessages(req, res) {
  messages = [];
  res.send("Messages cleared");
  console.log("cleared");
}
