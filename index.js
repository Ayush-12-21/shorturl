
const express = require("express");

const path = require('path');

const { connectToMongoDB } = require("./connect");

const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const URL = require("./model/url");
const port = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/shorturl")
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.error(err));

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/url", urlRoutes);
app.use("/user", userRoute);
app.use("/",staticRoute);
app.listen(port, () => console.log(`server started at ${port}`));
