const express = require("express");
const cors = require("cors");
const todoController = require("./controllers/todos");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

todosList = [];

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});

// app.get("/todo", (req, res) => {
//   res.json(todosList);
// });
app.get("/todo", todoController.findAll);

// app.get('/todo/:id', (req, res) => {
//   res.json(todosList.filter(x => x.id === Number(req.params.id)));
// });
app.get('/todo/:id', todoController.findOne);

app.post('/todo', todoController.create);

app.put('/todo');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});