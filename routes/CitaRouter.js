const { Router } = require("express");
const citaController = require('../controller/CitaController');
const router = Router();

router.post('/citas/add', (req, res) => {
    const cita = req.body;

    citaController.insertar(cita).then((result) => {
        return res.json({ insertId: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString()); //mensaje de error
    });
});

module.exports = router;