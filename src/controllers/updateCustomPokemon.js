const { Pokemon, Type } = require('../db');

const updateCustomPokemon = async (id, formData) => {
  const {
    name, image, types, hp, attack, defense, speed, height, weight
  } = formData

  if (!name || !image || !types) {
    throw {
      status: false,
      message: 'Missing required information.'
    }
  }

  try {
    const pokemonToUpdate = await Pokemon.findByPk(id)
    if (!pokemonToUpdate) {
      throw {
        status: false,
        message: `Pokemon with ID ${id} not found`
      }
    } else {
      await pokemonToUpdate.update({
        name, image, hp, attack, defense, speed, height, weight
      });

      const typesToUpdate = await Type.findAll({ where: { name: types } });
      await pokemonToUpdate.setTypes([]);
      await pokemonToUpdate.addTypes(typesToUpdate);

      return {
        message: 'Pokemon modified succesfully!'
      };
    }
  } catch (error) {
    throw {
      status: false,
      message: error
    };
  }
};

module.exports = updateCustomPokemon;