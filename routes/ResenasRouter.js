const { Router } = require("express");
const resenasController = require('../controller/ResenasController');
const router = Router();

router.post('/resenas/add', (req, res) => {
    const resena = req.body;

    resenasController.insertar(resena).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/resenas/get/all', (req, res) => {
    resenasController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/resenas/get/:id', (req, res) => {
    const { id } = req.params;

    resenasController.obtenerById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.put('/resenas/update', (req, res) => {
    const resena = req.body;

    resenasController.actualizar(resena).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.delete('/resenas/delete/:id', (req, res) => {
    const { id } = req.params;

    resenasController.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
