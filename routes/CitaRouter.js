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

// ← RUTA CORREGIDA CON FORMATO DE FECHA
router.put('/citas/update', async(req, res) => {
    try {
        const cita = req.body;

        console.log('=== ACTUALIZAR CITA ===');
        console.log('Datos recibidos:', JSON.stringify(cita, null, 2));

        if (!cita.Id_cita) {
            return res.status(400).json({ error: 'Falta Id_cita' });
        }

        if (!cita.Id_usuario) {
            return res.status(400).json({ error: 'Falta Id_usuario' });
        }

        // ← CORRECCIÓN: Formatear la fecha a YYYY-MM-DD
        if (cita.Fecha) {
            const fecha = new Date(cita.Fecha);
            cita.Fecha = fecha.toISOString().split('T')[0]; // Convierte a YYYY-MM-DD
        }

        console.log('Fecha formateada:', cita.Fecha);

        const result = await citaController.actualizar(cita);

        console.log('✅ Cita actualizada correctamente');

        return res.json({
            mensaje: 'Cita actualizada correctamente',
            affectedRows: result
        });
    } catch (err) {
        console.error('❌ ERROR EN /citas/update:');
        console.error('Mensaje:', err.message);

        return res.status(500).json({
            error: 'Error al actualizar la cita',
            detalles: err.message
        });
    }
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