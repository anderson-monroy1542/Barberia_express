const { Router } = require("express");
const rolesController = require('../controller/RolesController');
const router = Router();

router.get('/roles/get/all', (req, res) => {
    rolesController.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

router.get('/roles/get/:id', (req, res) => {
    const { id } = req.params;

    rolesController.obtenerById(id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});

module.exports = router;
