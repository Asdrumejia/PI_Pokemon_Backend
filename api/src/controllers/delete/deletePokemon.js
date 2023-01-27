const { Pokemon } = require("../../db");


const deletePokemon = async function (id){
   const deleteDb = await Pokemon.findByPk(id)

   const destroyPokemon = deleteDb?.destroy() 

   return destroyPokemon;
};


module.exports = {
    deletePokemon
}