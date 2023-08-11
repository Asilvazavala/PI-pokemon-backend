const getAllPokemon = require("./getAllPokemon");
const getAllTypes = require("./getAllTypes");
const getPokemonDetail = require("./getPokemonDetail");
const getPokemonBySearch = require("./getPokemonBySearch");
const postCustomPokemon = require("./postCustomPokemon");
const deleteCustomPokemon = require("./deleteCustomPokemon");
const updateCustomPokemon = require("./updateCustomPokemon");

module.exports = controllers = {
  getAllPokemon,
  getAllTypes,
  getPokemonDetail,
  getPokemonBySearch,
  postCustomPokemon,
  deleteCustomPokemon,
  updateCustomPokemon,
};