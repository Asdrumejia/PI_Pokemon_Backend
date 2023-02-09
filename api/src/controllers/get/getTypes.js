const axios = require('axios');
const { Type } = require('../../db');


const getTypes = async () => {
    let URL = 'https://pokeapi.co/api/v2/type';
    const dataTypes = await axios.get(URL);
    const typesInfo = dataTypes.data;
    const types = typesInfo.results.map(t => t.name);
    types.forEach(type => {
        Type.findOrCreate({
            where: {
                name: type
            }
        })
    })
   const allTypes = await Type.findAll();
   return allTypes;
};


module.exports = {
   getTypes
}