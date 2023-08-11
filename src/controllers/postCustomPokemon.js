const { Pokemon, Type } = require('../db');

const postCustomPokemon = async (formData) => {
  const {
    name, image, types, hp, attack, defense, speed, height, weight, createdInDB
  } = formData

  if (!name || !image || !types) {
    throw {
      status: false,
      message: 'Missing required information.'
    }
  }

  const pokemonAlreadyExist = await Pokemon.findOne({
    where:{ name }
  })

  if (pokemonAlreadyExist) {
    throw {
      status: false,
      message: 'The pokemon already exist! Choose another name.'
    }
  }

  const newPokemon = await Pokemon.create({
    name, image, types, hp, attack, defense, speed, height, weight, createdInDB
  })

  let addTypes = await Type.findAll({ where: { name: types } })
  newPokemon.addTypes(addTypes);

  return {
    status: 'done',
    message: "New pokemon added successfully!",
    pokemon: newPokemon
  }
};

module.exports = postCustomPokemon;