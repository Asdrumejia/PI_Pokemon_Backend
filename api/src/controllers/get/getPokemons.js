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


const getDetail = async(id) => {
  const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon = await apiData.data
  const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(t => {
        return ({
          name: t.type.name,
        })
      }),
  }
  return pokemonData;
}


const getDbInfo = async () => {
  return await Pokemon.findAll({
    include:{
      model: Type,
      attributes: ['name'],
      through:{ attributes: [] },
    }
  })
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