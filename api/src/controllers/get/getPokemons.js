const axios = require('axios')
const { Pokemon, Type } = require('../../db');


const getApiInfo = async () => {
  let URL = "https://pokeapi.co/api/v2/pokemon";
  let pokemones = [];
  do {
    const apiInfo = await axios.get(URL)
    const dataInfo = apiInfo.data
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
      image: poke.data.sprites.other.home.front_default,
      hp: poke.data.stats[0].base_stat,
      attack: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight,
      types: poke.data.types.map(t => {
        return ({
          name: t.type.name,
        })
      }),
    }
  }))
  return pokemonData;
}

const getDbInfo = async () => {
  const dB = await Pokemon.findAll({
     include: {
        model: Type, 
        attributes: ['name'],
         through: {
            attributes: [],  
        }
     }
})
   return dB;

};


const getDetail = async(id) => {
  if(!isNaN(id)){
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const poke = await apiData.data
    const pokemonData = {
      id: poke.id,
      name: poke.name,
      image: poke.sprites.other.home.front_default,
      hp: poke.stats[0].base_stat,
      attack: poke.stats[1].base_stat,
      defense: poke.stats[2].base_stat,
      speed: poke.stats[5].base_stat,
      height: poke.height,
      weight: poke.weight,
      types: poke.types.map(t => {
        return ({
          name: t.type.name,
        })
      }),
    }
    return pokemonData;
  }
  if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
    const responseDb = await Pokemon.findByPk(id, {
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      })
    return  responseDb 
 } 
}


const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
}


module.exports = {
  getApiInfo,
  getDetail,
  getAllPokemons,
}