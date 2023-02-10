const { Pokemon, Type } = require('../../db');


const postPokemon = async (name, hp, attack,  defense,  speed, height, weight, types, image, createdInDb) => {
    const createdPokemon = await Pokemon.create({
        name, 
        hp, 
        attack,  
        defense,  
        speed, 
        height, 
        weight, 
        image, 
        createdInDb 
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