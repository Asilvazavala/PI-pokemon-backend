require('dotenv').config()
const axios = require("axios").default;
const { Pokemon, Type } = require("../db");

const getPokemonDetail = async (id) => {
  const numericId = !isNaN(+id)
  if (numericId) {
    const fetchedPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return [{
      id: fetchedPokemon.data.id,
      name: fetchedPokemon.data.forms[0].name.charAt(0).toUpperCase() + fetchedPokemon.data.forms[0].name.slice(1),
      image: fetchedPokemon.data.sprites.other.home.front_default,
      types: fetchedPokemon.data.types.map(el => el.type.name.charAt(0).toUpperCase() + el.type.name.slice(1)),
      hp: fetchedPokemon.data.stats[0].base_stat,
      attack: fetchedPokemon.data.stats[1].base_stat,
      defense: fetchedPokemon.data.stats[2].base_stat,
      speed: fetchedPokemon.data.stats[5].base_stat,
      height: fetchedPokemon.data.height,
      weight: fetchedPokemon.data.weight,
    }];
  }

  const detail = await Pokemon.findOne({
    where: { id },
    include: Type
  });
  if (!detail) throw { message: "Not Found!" };
  return [detail];
};

module.exports = getPokemonDetail;