var router = require('express').Router();

var Client = require('../Models/Client');
var Type = require('../Models/Type');

router.get('/', (req, res) => {
    
    Client.find({}).populate('types').then(recupclient => {
        res.render('clients/index.html', { recupclient:recupclient });
        console.log(recupclient);
    });
});

router.get('/new', (req, res) => {
    Type.find({})
    .then(types => {
        var client = new Client();
        res.render('clients/edit.html', { client:client, types:types, endpoint: '/' });
    })
});

router.get('/edit/:id', (req, res) => {
    Type.find({})
    .then(types =>
        Client.findById(req.params.id)
        .then(client => {
            res.render('clients/edit.html', { client:client, types:types, endpoint:'/' + client._id.toString() });
        })
    )
});

router.get('/delete/:id', (req, res) => {
    Client.findOneAndRemove({_id: req.params.id})
    .then(pokemon => {
        res.redirect('/');
    })
});

router.get('/:id', (req, res) => {
    Client.findById(req.params.id).populate('types')
    .then(client => {
            res.render('clients/show.html', { client:client });
        },
        err => res.status(500).send(err)
    )
});

router.post('/:id?', (req, res) => {
    new Promise((resolve, reject) => {
        if(req.params.id) {
            Client.findById(req.params.id)
            .then(resolve, reject)
        }
        else {
            resolve(new Client())
        }
    })
    .then(clients => {
        clients.name = req.body.name;
        clients.description = req.body.description;
        clients.number = req.body.number;
        clients.types = req.body.types;

        if(req.file) clients.picture = req.file.filename;

        return clients.save();
    })
    .then(() => {
        res.redirect('./');
    })
});

module.exports = router;    