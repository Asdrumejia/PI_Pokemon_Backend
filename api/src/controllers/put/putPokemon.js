const { Pokemon } = require("../../db");

const putPokemon= async (id, name, image, hp, attack, defense, speed, height, weight, types) => {
    const PokemonDb = await Pokemon.findByPk(id)
 
    PokemonDb.update({
        name: name, 
        image: image,
        hp: hp, 
        attack: attack,
        defense: defense, 
        speed: speed,
        height: height,
        weight: weight,  
        types: types
    }) 
   return PokemonDb

 };
 
 
 module.exports = {
     putPokemon
 }