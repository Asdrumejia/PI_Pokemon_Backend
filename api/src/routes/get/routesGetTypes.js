const { Router } = require('express');
const { getTypes } = require('../../controllers/get/getTypes');


const router = Router();


router.get('/', async (req, res) => {
    const {name} = req.query;
    const types = await getTypes();
    try {
        if(name){
            let filterType = types.filter(t => t.name.toLowerCase().includes(name.toLocaleLowerCase()));
            filterType.length ? res.status(200).send(filterType) : res.status(404).send('Type not found'); 
        }else{
            res.status(200).send(types);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;