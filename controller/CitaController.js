// controller/CitaController.js
const { pool } = require("../database/MySQLConexion");
const citaQuery = require("../querys/CitaQuery");

module.exports = {
	async insertar(cita) {
        //VALIDACIONES
        const fechaCita = new Date(cita.Fecha + 'T00:00:00');
    
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); //borramos la hora actual para comparar solo fecha

        if (fechaCita <= hoy) {
            throw new Error("Las citas deben agendarse con al menos un día de anticipación (mínimo para mañana).");
        }

        const [horasStr, minutosStr] = cita.Hora.split(':');
        const horas = parseInt(horasStr);
        const minutos = parseInt(minutosStr);

        //citas cada 30 minutos
        if (minutos !== 0 && minutos !== 30) {
            throw new Error("Las citas solo se pueden agendar cada 30 minutos (ej. 8:00, 8:30)");
        }

        //horarios desde la db
        const queryHorario = citaQuery.obtenerHorarioPorNombreDia(cita.Dia);
        const [rowsHorario] = await pool.query(queryHorario.sql, queryHorario.values);

        if (rowsHorario.length === 0) {
            throw new Error(`No se encontraron horarios configurados para el ${cita.Dia}`);
        }

        const horarioDia = rowsHorario[0]; 
        const horaCita = cita.Hora; 
        const horaApertura = horarioDia.inicio.substring(0, 5);
        const horaCierre = horarioDia.fin.substring(0, 5);     

        if (horaCita < horaApertura || horaCita >= horaCierre) {
                throw new Error(`Solo se pueden hacer citas dentro del horario establecido (${horaApertura} - ${horaCierre})`);
        }

        //disponibilidad de cita
        const queryVerificar = citaQuery.verificarDisponibilidad(cita);
        const [existentes] = await pool.query(queryVerificar.sql, queryVerificar.values);
        
        if (existentes[0].total > 0) {
            throw new Error("El barbero ya tiene una cita agendada en ese horario.");
        }

        const queryInsertar = citaQuery.insertar(cita);
        const [result] = await pool.execute(queryInsertar.sql, queryInsertar.values);
        return result.insertId;
    },

	async obtenerTodos() {
    const [result] = await pool.query(
        citaQuery.obtenerTodos()
        );
        return result;
    },

    async obtenerPorDia(dia) {
        const [result] = await pool.query(
        citaQuery.obtenerByDiaConDetalles(dia)
        );
        return result;
    },

    async obtenerByIdConDetalles(idCita) {
        const [result] = await pool.query(
        citaQuery.obtenerByIdConDetalles(idCita)
        );
        return result[0];
    },

    async actualizar(cita) {
        const [result] = await pool.execute(
        citaQuery.actualizar(cita)
        );
        return result.affectedRows;
    },

    async eliminarById(idCita) {
        const [result] = await pool.execute(
        citaQuery.eliminarById(idCita)
        );
        return result.affectedRows;
    },

    async obtenerByUsuario(idUsuario) {
        const [result] = await pool.query(
        citaQuery.obtenerByUsuarioConDetalles(idUsuario)
        );
        return result;
    }
};
