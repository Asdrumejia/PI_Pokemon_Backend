const { Router } = require('express');
const { getPokemonsApi, getAllPokemons, getPokemonById } = require('../../controllers/get/getPokemons');


const router = Router();


router.get('/', async (req, res) => {
    const {name} = req.query;
    const pokemones = await getAllPokemons();
    try {
        if(name){
        let poke = pokemones.filter(p => p.name?.toLowerCase() == name?.toLowerCase());
            poke.length !==0 ? res.status(200).send(poke) : res.status(404).send('Pokemon not found');
        }else{
           res.status(200).send(pokemones);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});


router.get('/:id', async (req, res) => {
//  const id = req.params.id;
    const {id} = req.params;
    const pokeDetail = await getPokemonById(id);
    try {
        res.status(200).send(pokeDetail);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;