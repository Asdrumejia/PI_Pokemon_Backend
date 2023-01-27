const { Router } = require('express');
const { putPokemon } = require('../../controllers/put/putPokemon');


const router = Router();

router.put('/:id', async (req, res) => {
    try {
       const {id} = req.params
       const {name, image, hp, attack, defense, speed, height, weight, types} = req.body 
       if(!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types){
          res.status(404).send("Missing data to modify this pokemon")
       }else{
          const recipeUpdated = await putPokemon(id, name, image, hp, attack, defense, speed, height, weight, types)
          res.status(200).send("Successfully modified pokemon")
       }
    } catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = router;