const { Router } = require("express");
const citaController = require('../controller/CitaController');
const router = Router();

router.post('/citas/add', (req, res) => {
    const cita = req.body;

    citaController.insertar(cita).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/citas/get/all', (req, res) => {
    citaController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

//ruta nueva para usar en resenas
/**
 * Endpoint para obtener una Cita específica por su ID, con todos los detalles.
 * GET: /citas/get/5
 */
router.get('/citas/get/:id', (req, res) => {
    const { id } = req.params;

    citaController.obtenerByIdConDetalles(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});


router.get('/citas/get/dia/:dia', (req, res) => {
    const { dia } = req.params;

    citaController.obtenerPorDia(dia).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/citas/get/usuario/:id', (req, res) => {
    const { id } = req.params;

    citaController.obtenerByUsuario(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.put('/citas/update', (req, res) => {
    const cita = req.body;

    citaController.actualizar(cita).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.delete('/citas/delete/:id', (req, res) => {
    const { id } = req.params;

    citaController.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;