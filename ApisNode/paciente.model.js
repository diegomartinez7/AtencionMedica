module.exports = {
    // Get todos los pacientes
    getAll: (connection, callback) => {
        connection.query('select * from paciente', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true }); // array contiene a los usuarios 
        })
    },
    // Get por ID
    getId: (connection, id, callback) => {
        connection.query('select * from paciente where ID = ' + id, (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 

            if(results.length == 0){
                callback({ array: null, id: null, success: false, message: 'No existe el id'}); 
                return;
            }
            callback({ array: results[0], id: null, success: true });
        })
    },
    // Post de paciente
    postPaciente: (connection, body, callback) => {
        connection.query('insert into paciente SET ?', body, (err, results) =>{
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: results, id: null, success: true });
        });
    },
    // Actualizar paciente
    putPaciente: (connection,body,callback) => {
        connection.query('update paciente set Nombre = ?, Apellidos = ?, Genero = ?, Edad = ?, Nivel_S = ?, Poblacion = ?, Tipo_E = ?, Enfermedades = ? WHERE ID = ?', [body.Nombre,body.Apellidos,body.Genero,body.Edad,body.Nivel_S,body.Poblacion,body.Tipo_E,body.Enfermedades,body.Id], (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: null, id: null, success: true });
        })
    },
    // Borrar paciente
    deletePaciente: (connection,body,callback) => {
        connection.query('delete from paciente where ID = '+body.Id, (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            if(results.affectedRows == 0){
                callback({ array: null, id: null, message: 'No existe el id' }); 
                return; 
            }
            callback({ array: null, id: null, success: true });
        })
    }
}