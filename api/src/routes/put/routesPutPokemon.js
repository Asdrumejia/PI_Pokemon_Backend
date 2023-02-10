const { Router } = require('express');
const { putPokemon } = require('../../controllers/put/putPokemon');


const router = Router();


router.put('/:id', async (req, res) => {
    try {
       const {id} = req.params
       const { name, hp, attack,  defense,  speed, height, weight, types, image } = req.body;
       if(!name || !hp || !attack || !defense || !speed || !height || !weight || !types || !image){
          res.status(404).send('Missing data to modify this pokemon');
       }else{
          const pokemonUpdated = await putPokemon(id, name, hp, attack,  defense,  speed, height, weight, types, image);
          res.status(200).send('Successfully modified pokemon');
       }
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;