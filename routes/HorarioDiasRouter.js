const { Router } = require("express");
const controller = require('../controller/HorarioDiasController');
const router = Router();

/**
 * Endpoint para CREAR un nuevo bloque de horario.
 */
router.post('/horariodias/add', (req, res) => {
    const horario = req.body;
    controller.insertar(horario).then((result) => {

        return res.json({ insertId: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

/**
 * Endpoint para LEER todos los horarios.

 */
router.get('/horariodias/get/all', (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

/**
 * Endpoint para LEER todos los horarios de UN DÍA.
 */
router.get('/horariodias/get/dia/:idDia', (req, res) => {
    const { idDia } = req.params;
    controller.obtenerPorDia(idDia).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

/**
 * Endpoint para ACTUALIZAR un bloque de horario.
 */
router.put('/horariodias/update', (req, res) => {
    const horario = req.body;
    controller.actualizar(horario).then((result) => {
        // Devolvemos las filas afectadas
        return res.json({ affectedRows: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

/**
 * Endpoint para ELIMINAR un bloque de horario por ID.
 */
router.delete('/horariodias/delete/:id', (req, res) => {
    const { id } = req.params;
    controller.eliminarById(id).then((result) => {
        // Devolvemos las filas afectadas
        return res.json({ affectedRows: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

module.exports = router;