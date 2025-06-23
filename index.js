
const express = require("express");

const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require("./connect");

const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth');


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
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly, urlRoutes);
app.use("/user", userRoute);
app.use("/",checkAuth,staticRoute);

app.listen(port, () => console.log(`server started at ${port}`));
