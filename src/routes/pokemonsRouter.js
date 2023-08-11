require('dotenv').config()
const controllers = require("../controllers");
const express = require("express");

const pokemonsRouter = express.Router();

pokemonsRouter
  .get("/", async (req, res) => {
    const { name } = req.query;
      if (name) {
        try {
        const data = await controllers.getPokemonBySearch(name);
        if (data) {
          res.send(data);
        }
        } catch (error) {
          console.log(error)
          res.status(404).send(error);
        }
      } else {
        try {
          const data = await controllers.getAllPokemon();
          res.send(data);
        } catch (error) {
          console.log(error)
          res.status(500).send(error)
        }
      }

  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      res.send(await controllers.getPokemonDetail(id));
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  })

  .post("/", async (req, res) => {
    const pokemonCreationForm = req.body;
    try {
      res.status(201).send(await controllers.postCustomPokemon(pokemonCreationForm));
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const pokemonUpdateForm = req.body;
    try {
      res.status(201).send(await controllers.updateCustomPokemon(id, pokemonUpdateForm));
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      res.status(201).send(await controllers.deleteCustomPokemon(id));
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });

module.exports = pokemonsRouter;