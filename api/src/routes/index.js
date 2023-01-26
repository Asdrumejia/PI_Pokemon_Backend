const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesGetPokemons = require('./get/routesGetPokemons');
const routesTypes = require('./get/routesGetTypes');
const routesPostPokemon = require('./post/routesPostPokemon');



const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/pokemons', routesGetPokemons);

router.use('/types', routesTypes);

router.use('/pokemon', routesPostPokemon);

module.exports = router;
