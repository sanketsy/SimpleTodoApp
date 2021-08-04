const express = require("express");
const mustacheExpress = require("mustache-express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected.");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine("mustache", mustacheExpressInstance);
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}.`);
});