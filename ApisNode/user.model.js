module.exports = {
    // Get todos los usuarios
    getAll: (connection, callback) => {
        connection.query('select * from usuario', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true }); // array contiene a los usuarios 
        })
    },
    // Get por ID
    getId: (connection, id, callback) => {
        connection.query('select * from usuario where ID = ' + id, (err, results) => {
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
    // Post de usuario
    postUser: (connection, body, callback) => {
        connection.query('insert into usuario SET ?', body, (err, results) =>{
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: results, id: null, success: true });
        });
    },
    // Actualizar usuario
    putUser: (connection, id, body, callback) => {
        connection.query('update usuario set Nombre = ?, Apellidos = ?, Correo = ?, Contrasena = ?, Telefono = ?, Tipo = ?, Disponibilidad= ? WHERE ID = ?', [body.Nombre,body.Apellidos,body.Correo,body.Contrasena,body.Telefono,body.Tipo,body.Disponibilidad,id], (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: results, id: null, success: true });
        })
    },
    // Borrar usuario
    deleteUser: (connection, id, callback) => {
        connection.query('delete from usuario where ID = '+ id, (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            if(results.affectedRows == 0){
                callback({ array: null, id: null, success: false, message: 'No existe el id' }); 
                return; 
            }
            callback({ array: null, id: null, success: true });
        })
    }
}