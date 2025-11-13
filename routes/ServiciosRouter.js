const { Router } = require("express");
const serviciosController = require('../controller/ServiciosController');
const router = Router();

router.post('/servicios/add', (req, res) => {
    const servicio = req.body;

    serviciosController.insertar(servicio).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/servicios/get/all', (req, res) => {
    serviciosController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/servicios/get/:id', (req, res) => {
    const { id } = req.params;

    serviciosController.obtenerById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.put('/servicios/update', (req, res) => {
    const servicio = req.body;

    serviciosController.actualizar(servicio).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.delete('/servicios/delete/:id', (req, res) => {
    const { id } = req.params;

    serviciosController.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
