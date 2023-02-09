const { Router } = require ('express');
const { postPokemon } = require('../../controllers/post/postPokemon');


const router = Router();


router.post('/', async (req, res) => {
    const { name, hp, attack,  defense,  speed, height, weight, types, image } = req.body;
    try {
        if (!name || !hp || !attack || !defense || !speed || !height || !weight || !types  || !image){
          return res.status(404).json('Missing data to create Pokemon');
        }
        const newPokemon = await postPokemon(name, hp, attack,  defense,  speed, height, weight, types, image);
        res.status(200).send(newPokemon);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;
