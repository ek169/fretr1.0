const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var cors = require('cors');
const Data = require("./data");
var bcrypt = require('bcrypt');
var session = require('express-session');


const API_PORT = 5000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://admin:development1@ds131687.mlab.com:31687/fretrdb";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'tv pillow chair'}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

// generate hash function for tokens
function generateHash(token)
{
  return bcrypt.hashSync(token, bcrypt.genSaltSync(8), null);
}

// login method
var User = require('./users.js');
var sess;

app.post('/save', function(req, res) {
  sess = req.session;
  if(sess.token)
  {
    var body = req.body;
    console.log(body);
    var user
  }

});

app.post('/login', function(req, res) {
  var body = req.body;
  sess = req.session;
  console.log(res);
  console.log("credential: ");
  console.log(body.credential.id);
  if(body.credential && typeof(body.credential.id !== "undefined"))
  {
    console.log("in if statement");
    var credential = body.credential;
    User.findOne({credentials: { $elemMatch: {id: credential.id}}}, function(err, user) {
      if(err)
      {
        return res.json({ success: false, response: "could not login or create user"});
      }
      else if(!user)
      {
        // user does not exist
        console.log("override: ");
        console.log(body.override);
        if(body.override)
        {
          if(credential.id && credential.token)
          {
                // did not find a user with those credentials, so create new user
            var name = body.name;
            var email = body.email;
            var img = body.img;
            var credential_id = credential.id;

            var new_user = new User({
              name: name,
              email: email,
              img: img,
              credentials: [{credential_id: generateHash(credential.token)}]
            });

            new_user.save();
            var data = {name: new_user.name, email: new_user.email, items: null};
            sess.token=credential.token;
            return res.json({ success: true, data: data});

          }
          else {
            // found an existing user with those credentials
            return res.json({ success: false, data: {response: "username already exists"} });
          }
        }
      }
      else if (!user.validCredential(credentials.id, credentials.id_token)) {
        // password did not match
        return res.json({ success: false, data: {response: "invalid password"} });
      } else {
        // password matched. proceed forward
        var data = {name: user.name, email: user.email, items: null};
        sess.token=credential.token;
        return res.json({ success: true, data: data});
      }
    });
  }
  else {
      console.log("in else statement");
      return res.json({ success: false, response: "no credentials found"});
  }
});

// this is our get method
// this method fetches all available data in our database
app.get('/logout', function(req, res) {
  console.log("getting to logout");
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
    }
  });

});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
