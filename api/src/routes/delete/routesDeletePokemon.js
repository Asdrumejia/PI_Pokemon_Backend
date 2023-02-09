const { Router } = require('express');
const { deletePokemon } = require('../../controllers/delete/deletePokemon');


const router = Router();


router.delete('/:id', async (req, res) => {
    try {
       const {id} = req.params;
       const pokemonDeleted = await deletePokemon(id);
     res.status(200).send('Pokemon successfully deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;
