const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connect_to_mongoDb } = require("./connection");
const URL = require("./models/url");
const { check_for_authentication, restrict_to } = require("./middleware/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connect_to_mongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDb Connected!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(check_for_authentication);


app.use("/url" ,restrict_to(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute)
app.use('/', staticRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));