const { Pokemon, Type } = require('../db');

const deleteCustomPokemon = async (id) => {
  const pokemonToDelete = await Pokemon.findOne({
    where: { id },
    include: Type
  });

  if (!pokemonToDelete) {
    throw { message: "Not Found!" }
  } else {
      await Pokemon.destroy({
        where : {id : id}
      })
    }
  
  return {
    status: 'done',
    message: 'Pokemon deleted successfully!',
  }
};

module.exports = deleteCustomPokemon;