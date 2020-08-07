const express = require("express");

const verify = require('../validation/veryfyToken')

const authRoute = require("./auth/auth");
const contactRoute = require("./contact/contact");

const routers = express.Router();

// Routes Middleware

routers.use("/", authRoute);
routers.use("/contact", verify, contactRoute);


module.exports = routers