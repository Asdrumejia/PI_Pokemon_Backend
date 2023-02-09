const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require('./get/routesGetPokemons');
const getTypes = require('./get/routesGetTypes');
const postPokemon = require('./post/routesPostPokemon');
const putPokemon = require('./put/routesPutPokemon');
const deletePokemon = require('./delete/routesDeletePokemon');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/pokemons', getPokemons);

router.use('/types', getTypes);

router.use('/pokemon', postPokemon);

router.use('/pokemon', putPokemon);

router.use('/pokemon', deletePokemon);


module.exports = router;
