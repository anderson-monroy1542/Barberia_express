const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;
const ip = 'localhost';

// importamos las rutas


const usuarios = require('./routes/UsuariosRouter');
const servicios = require('./routes/ServiciosRouter');
const horarioDias = require('./routes/HorarioDiasRouter');
const citas = require('./routes/CitaRouter');
const resenas = require('./routes/ResenasRouter');
const roles = require('./routes/RolesRouter');
const estadoServicios = require('./routes/EstadoServiciosRouter');
const estadoCita = require('./routes/EstadoCitaRouter');
const dias = require('./routes/DiasRouter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// usamos las rutas

app.use(usuarios);
app.use(servicios);
app.use(citas);
app.use(resenas);
app.use(roles);
app.use(horarioDias);
app.use(estadoServicios);
app.use(estadoCita);
app.use(dias);

app.listen(port, ip, () => {
    console.log(`Servidor iniciado y esta escuchando en el puerto ${port}`);
});