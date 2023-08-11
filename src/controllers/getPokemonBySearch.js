require('dotenv').config()
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require("sequelize");

const getPokemonBySearch = async (search) => {
  const customPokemon = await Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}`,
      },
    },
    include: Type
  });

  if (customPokemon.length > 0) return customPokemon

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
    const apiPokemon = res.data;
    if (apiPokemon.name) {
      return [{
        id: apiPokemon.id,
        name: apiPokemon.forms[0].name.charAt(0).toUpperCase() + apiPokemon.forms[0].name.slice(1),
        image: apiPokemon.sprites.other.home.front_default,
        types: apiPokemon.types.map(el => el.type.name.charAt(0).toUpperCase() + el.type.name.slice(1)),
        hp: apiPokemon.stats[0].base_stat,
        attack: apiPokemon.stats[1].base_stat,
        defense: apiPokemon.stats[2].base_stat,
        speed: apiPokemon.stats[5].base_stat,
        height: apiPokemon.height,
        weight: apiPokemon.weight,
      }];
    }
  } catch (error) {
    console.log(error);
  }

  throw {
    status: false,
    message: 'Not Found!'
  };

}

module.exports = getPokemonBySearch;