const { Router } = require("express");
const usuariosController = require('../controller/UsuariosController');
const router = Router();

router.get('/usuarios', usuariosController.getUsuariosFiltrados); 

module.exports = router;

router.post('/usuarios/registrar', (req, res) => {
    const usuario = req.body;
    usuariosController.insertar(usuario).then((result) => {
        return res.json({ insertId: result });
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
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

router.get('/usuarios/barberos', (req, res) => {
    usuariosController.obtenerBarberos().then((result) => {
        return res.json(result);//barberos
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

router.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    try {
        datos.Id_usuario = id;

        const result = await usuariosController.actualizar(datos);

        res.json({
            message: "Usuario actualizado correctamente",
            result
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al actualizar usuario");
    }
});

router.get('/usuarios/clientes', (req, res) => {
    usuariosController.obtenerClientes().then((result) => {
        return res.json(result); //clientes
    }).catch((err) => {
        console.log(err);
        return res.status(500).send(err.toString());
    });
});

module.exports = router;