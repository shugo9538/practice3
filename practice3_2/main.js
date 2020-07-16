const mongoose = require("mongoose");
  mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
  );

const port = 3000,
  express = require("express"),
  ejs = require("ejs"),
  bodyParser = require("body-parser"),
  app = express();

const userController = require("./controllers/userController");

const db = mongoose.connection;
const router = express.Router();

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));

app.use("/", router);

app.get("/users", userController.index, userController.indexView);

router.get("/users/new", userController.new);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
