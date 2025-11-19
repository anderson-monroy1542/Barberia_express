const { Router } = require("express");
const citaController = require('../controller/CitaController');
const router = Router();

router.post('/citas/add', (req, res) => {
  citaController.insertar(req.body)
    .then(result => res.json({ insertId: result }))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.get('/citas/get/all', (req, res) => {
  citaController.obtenerTodos()
    .then(result => res.json(result))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.get('/citas/get/:id', (req, res) => {
  citaController.obtenerByIdConDetalles(req.params.id)
    .then(result => res.json(result))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.get('/citas/get/dia/:dia', (req, res) => {
  citaController.obtenerPorDia(req.params.dia)
    .then(result => res.json(result))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.get('/citas/get/usuario/:id', (req, res) => {
  citaController.obtenerByUsuario(req.params.id)
    .then(result => res.json(result))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.put('/citas/update', (req, res) => {
  citaController.actualizar(req.body)
    .then(result => res.json({ updated: result }))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

router.delete('/citas/delete/:id', (req, res) => {
  citaController.eliminarById(req.params.id)
    .then(result => res.json({ deleted: result }))
    .catch(err => { console.log(err); res.status(500).send('error'); });
});

module.exports = router;
