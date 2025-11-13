const { Router } = require("express");
const diasController = require('../controller/DiasController');
const router = Router();


router.get('/dias/get/all', (req, res) => {
    diasController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;