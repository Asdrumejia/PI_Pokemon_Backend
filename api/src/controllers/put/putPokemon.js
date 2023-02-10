const { Pokemon } = require('../../db');


const putPokemon= async (id, name, hp, attack,  defense,  speed, height, weight, types, image) => {
    const PokemonDb = await Pokemon.findByPk(id);
 
    PokemonDb?.update({
        name: name, 
        hp: hp, 
        attack: attack,
        defense: defense, 
        speed: speed,
        height: height,
        weight: weight,  
        types: types,
        image: image
    }) 
   return PokemonDb;
 };
 
 
 module.exports = {
    putPokemon
 }