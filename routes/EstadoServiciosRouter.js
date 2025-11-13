const { Router } = require("express");
const estadoServiciosController = require('../controller/EstadoServiciosController');
const router = Router();

router.get('/estadoservicios/get/all', (req, res) => {
    estadoServiciosController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
