var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var data = [{ item: "study hard" }, { item: "dont be overthinker" }];

//import mongos
var mongoose = require("mongoose");

//conect to db
mongoose.connect(
  "mongodb://salma_badr:salma123db@ds251197.mlab.com:51197/todo-list",
  { useNewUrlParser: true }
);

//create schema
var todoSchema = new mongoose.Schema({
  item: String
});

// insert record to db
var Todo = mongoose.model("items", todoSchema);
// var itemOne = Todo({ item: "buy watch" }).save(function(err) {
//   if (err) throw err;
//   console.log("saved");
// });

module.exports = function(app) {
  //get all items api
  app.get("/todo", function(req, res) {
    //return view of to do
    //get data from db and pass it to view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  // add item api
  app.post("/todo", urlencodedParser, function(req, res) {
    //get data from view and pass it to db
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
    // data.push(req.body);
  });

  //delete item api
  app.delete("/todo/:item", function(req, res) {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
