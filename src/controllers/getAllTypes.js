const axios = require('axios');
const API_URL_TYPES = 'https://pokeapi.co/api/v2/type';
const { Type } = require('../db');

const getAllTypes = async () => {
  const storedTypes = await Type.findAll() 
  if (storedTypes.length) {
    return storedTypes
  }
  
  const apiType = await axios.get(API_URL_TYPES, {
    headers: {
      "Accept-Encoding": "null",
    },  
  })
  
  const createType = await apiType.data.results.map
  (el => el.name[0].toUpperCase() + el.name.slice(1))

  createType.map(el => Type.findOrCreate({
    where: {name: el}
  })) 

   const allPokemonTypes = await Type.findAll();
   return (allPokemonTypes);
}

module.exports = getAllTypes;