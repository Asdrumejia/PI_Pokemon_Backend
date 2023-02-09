const { Pokemon, Type } = require('../../db');


const postPokemon = async (name, hp, attack,  defense,  speed, height, weight, types, image, createInDb) => {
    const createdPokemon = await Pokemon.create({
        name, 
        hp, 
        attack,  
        defense,  
        speed, 
        height, 
        weight, 
        image, 
        createInDb, 
    });

     
     const typesDb = await Type.findAll({
     where: { name : types }
    });

    await createdPokemon.addType(typesDb);
    return createdPokemon;
};


module.exports = {
   postPokemon
}