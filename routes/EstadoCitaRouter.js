const { Router } = require("express");
const estadoCitaController = require('../controller/EstadoCitaController');
const router = Router();

router.get('/estadocita/get/all', (req, res) => {
    estadoCitaController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
