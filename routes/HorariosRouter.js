const { Router } = require("express");
const horariosController = require('../controller/HorariosController');
const router = Router();

router.post('/horarios/add', (req, res) => {
    const horario = req.body;

    horariosController.insertar(horario).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/horarios/get/all', (req, res) => {
    horariosController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/horarios/get/:id', (req, res) => {
    const { id } = req.params;

    horariosController.obtenerById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/horarios/get/dia/:dia', (req, res) => {
    const { dia } = req.params;

    horariosController.obtenerPorDia(dia).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.put('/horarios/update', (req, res) => {
    const horario = req.body;

    horariosController.actualizar(horario).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.delete('/horarios/delete/:id', (req, res) => {
    const { id } = req.params;

    horariosController.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
