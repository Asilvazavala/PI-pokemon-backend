require('dotenv').config()
const controllers = require("../controllers");
const express = require("express");

const typesRouter = express.Router();

typesRouter
  .get("/", async (req, res) => {
    try {
      res.send(await controllers.getAllTypes());
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  });

module.exports = typesRouter;