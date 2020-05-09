var router = require('express').Router();

var Type = require('./../Models/Type');

router.get('/:type', (req, res) => {
    Type.findOne({name: req.params.type}).populate('pokemons').then(type => {
        
        if(!type) return res.status(404).send('Type Introuvable..');
        
        console.log(Type);
        
        res.render('types/show.html', {
            type: type,
            pokemons: type.pokemons
        });
        
    });
});

module.exports = router;