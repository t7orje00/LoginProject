var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var collection;

const MongoClient = require('mongodb').MongoClient;
// replace the uri string with your connection string.
//mongodb+srv://phe:<password>@cluster0-xb6qi.mongodb.net/test?retryWrites=true&w=majority
const uri = "mongodb+srv://user1:1234@cluster0-ek7qj.mongodb.net/user-db?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }

  console.log('Connected...');
  collection = client.db("Cluster0").collection("user-db");

  var server = app.listen(process.env.PORT || 4200, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/user-db/id/:id", function(req, res) {
  collection.findOne({_id: new ObjectID(req.params.id)}, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get user.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/user-db/email/:email", function(req, res) {
  collection.findOne({email: req.params.email}), (function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post("/user-db", function(req, res) {
  var newUser = req.body;

  collection.insertOne(newUser, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new user.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/user-db/:id", function(req, res) {
  collection.findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/user-db/:name", function(req, res) {
  collection.findOne({ _id: new ObjectID(req.params.name) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/user-db/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  collection.updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/user-db/:id", function(req, res) {
  collection.deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(204).end();
    }
  });
});
