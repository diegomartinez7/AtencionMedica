module.exports = {
    // Get todas las consultas
    getAll: (connection, callback) => {
        connection.query('select * from consulta', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true }); // array contiene a los usuarios 
        })
    },
    // Get por ID
    getId: (connection, id, callback) => {
        connection.query('select * from consulta where ID = ' + id, (err, results) => {
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
    // Post de consulta
    postConsulta: (connection, body, callback) => {
        connection.query('insert into consulta SET ?', body, (err, results) =>{
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: null, id: null, success: true });
        });
    },
    // Actualizar consulta
    putConsulta: (connection,body,callback) => {
        connection.query('update consulta set Fecha = ?, Malestar = ?, Peso = ?, Talla = ?, Temperatura = ?, Presion_A = ?, Pulso = ?, Diagnostico = ?, Nota = ? WHERE ID = ?', [body.Fecha,body.Malestar,body.Peso,body.Talla,body.Temperatura,body.Presion_A,body.Pulso,body.Diagnostico,body.Nota,body.Id], (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: null, id: null, success: true });
        })
    },
    // Borrar usuario
    deleteConsulta: (connection,body,callback) => {
        connection.query('delete from consulta where ID = '+body.Id, (err, results) => {
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