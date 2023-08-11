require('dotenv').config()
const axios = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon, Type } = require('../db');

const getPokemon = async () => {
  const customPokemon = await Pokemon.findAll({
    include: Type
  });

  const pokemon = [];
  const fisrtPage = await axios.get(API_URL);
  pokemon.push(...fisrtPage.data.results);

  // Agregar pokemon del 20 al 100
  let offset = 20;

  for(let i = 0;  i < 4; i++) {
    let apiUrl = await axios.get(`${API_URL}?offset=${offset}&limit=20`, {
      headers: {
        "Accept-Encoding": "null",
      },  
    })
    pokemon.push(...apiUrl.data.results);
    offset += 20;
  }
  
  const apiInfo = pokemon.map(async (el) => {
    const data = await axios.get(`${API_URL}/${el.name}`);
    return {
      id: data.data.id,
      name: data.data.forms[0].name.charAt(0).toUpperCase() + data.data.forms[0].name.slice(1),
      image: data.data.sprites.other.home.front_default,
      types: data.data.types.map(el => el.type.name.charAt(0).toUpperCase() + el.type.name.slice(1)),
      hp: data.data.stats[0].base_stat,
      attack: data.data.stats[1].base_stat,
      defense: data.data.stats[2].base_stat,
      speed: data.data.stats[5].base_stat,
      height: data.data.height,
      weight: data.data.weight,
    };
});

  const finalData = await Promise.all(apiInfo).then((data) => data);
  return finalData.concat(customPokemon)
};

module.exports = getPokemon;