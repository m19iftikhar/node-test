const { Signup, Login } = require("../../service/auth");
const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/signup", Signup);
authRoutes.post("/login", Login);

module.exports = authRoutes;
