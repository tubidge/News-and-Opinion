const express = require("express");
const app = express();
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");

// const db = require("./models");

const PORT = process.env.PORT || 3000;

// configuring middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// configuring handlebars engine
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// creating DB connection based on environment
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

const routes = require("./controllers/news_controller");
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));