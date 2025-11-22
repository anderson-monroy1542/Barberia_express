const { Router } = require("express");
const usuariosController = require('../controller/UsuariosController');
const router = Router();

router.get('/usuarios', usuariosController.getUsuariosFiltrados); 

module.exports = router;

router.post('/usuarios/registrar', (req, res) => {
    const usuario = req.body;

    usuariosController.insertar(usuario).then((result) => {
        // --- ¡ESTA ES LA LÍNEA CORREGIDA! ---
        // 'result' es el ID (ej. 15). Lo envolvemos en un objeto JSON.
        return res.json({ insertId: result });
        // --- FIN DE LA CORRECCIÓN ---
        
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('exception generada');
    });
});


router.post('/usuarios/login', (req, res) => {
    const { correo, password } = req.body;

    usuariosController.obtenerByCorreoByPassword(correo, password).then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);

        return res.status(401).send(err.toString());
    });
});

module.exports = router;