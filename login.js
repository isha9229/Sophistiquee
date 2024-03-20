const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql1234.",
  database: "website",
});

// connect to the database
connection.connect(function (error) {
  if (error) throw error;
  else console.log("Connected to the database successfully!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Signup.html");
});

app.post("/", encoder, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  connection.query("select * from userlogin where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
      if (results.length > 0) {
        res.redirect("/trial");
      } else {
        res.redirect("/");
      }
      res.end();
    }
  );
});

// when login is success
app.get("/trail", function (req, res) {
  res.sendFile(__dirname + "/trial.html");
});

// set app port
app.listen(4000);
