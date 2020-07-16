const mongoose = require("mongoose");
  mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
  );

mongoose.Promise = global.Promise;

const db = mongoose.connection;
const subscriberController = require("./controllers/subscribersController");
const port = 3000,
  express = require("express"),
  ejs = require("ejs")
  app = express();
const bodyParser = require("body-parser");
const Subscriber = require("./models/subscriber");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));
// app.use(express.json());
app.set("view engine", "ejs");

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

var contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@reipeapp.com",
    zipCode: 20331
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103
  },
]

var commands = [];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

contacts.forEach((c) => {
  commands.push(Subscriber.create({
    name: c.name,
    email: c.email
  }));
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${eroor}`);
  });

app.get("/subscribers", subscriberController.getAllSubscribers, (req, res, next) => {
  console.log(req.data);
})
.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});

app.get("/contact", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);
