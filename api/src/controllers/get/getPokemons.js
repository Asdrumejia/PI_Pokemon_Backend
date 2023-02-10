const axios = require('axios')
const { Pokemon, Type } = require('../../db');


const getPokemonsApi = async () => {
  let URL = 'https://pokeapi.co/api/v2/pokemon';
  let pokemones = [];
  do {
    const apiInfo = await axios.get(URL);
    const dataInfo = apiInfo.data;
    const resultsApi = await dataInfo.results.map(p => {
      return {
        name: p.name,
        url: p.url
      }
    })
    pokemones.push(...resultsApi);
    URL = dataInfo.next;
  } while ( URL != null && pokemones.length < 200);

  let pokemonData = await Promise.all(pokemones.map( async p => {
    let poke = await axios.get(p.url);
    return {
      id: poke.data.id,
      name: poke.data.name,
      hp: poke.data.stats[0].base_stat,
      attack: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight,
      types: poke.data.types.map(t => t.type.name).join(', '),
      image: poke.data.sprites.other.home.front_default
    }
  }))
  return pokemonData;
};


const getDbInfo = async () => {
  const dB = await Pokemon.findAll({
     include: {
        model: Type, 
        attributes: ['name'],
         through: {attributes: []}
     }
})
   return dB;
};


const getPokemonById = async(id) => {
    if(!isNaN(id)){
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const poke = await apiData.data;
    const pokemonData = {
        id: poke.id,
        name: poke.name,
        hp: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[5].base_stat,
        height: poke.height,
        weight: poke.weight,
        types: poke.types.map(t => t.type.name).join(', '),
        image: poke.sprites.other.home.front_default
    }
    return pokemonData;
  }
  if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
    const responseDb = await Pokemon.findByPk(id, {
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {attributes: []}
          }
        ]
      })
    return  responseDb;
  }
};


const getAllPokemons = async () => {
    const apiInfo = await getPokemonsApi();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};


module.exports = {
   getPokemonsApi,
   getPokemonById,
   getAllPokemons
}