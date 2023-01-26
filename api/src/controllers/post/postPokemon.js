const { Pokemon, Type } = require("../../db");

const postPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {
    const createdPokemon = await Pokemon.create({
        name, 
        hp, 
        attack,
        defense, 
        speed,
        height, 
        weight, 
        image, 
    })

     let typesDb = await Type.findAll({
     where: { name : types }
  })

  createdPokemon.addType(typesDb);
  return createdPokemon;
}

module.exports = {
   postPokemon
}