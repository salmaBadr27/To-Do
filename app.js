//import todoController or module
var todoController = require("./controllers/todoController.js");

// import express helper methods
var express = require("express");

// define our app
var app = express();

// set view engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
