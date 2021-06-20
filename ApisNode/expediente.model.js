var pc = {};
var cl = [];
var pac = [];
var expedientes = []
async function setPaciente(data){
    pc = data;
}
async function setConsulta(data){
    cl = data;
}

async function setPacientes(data){
    pac = data
}

async function pushArray(paciente,consultas){
    expedientes.push({paciente: paciente,consultas: consultas});
    console.log('EXPEDIENTES =>' + JSON.stringify(expedientes));
}

module.exports = { 
    // Get todos los expedientes
    getAll: (connection, callback) => {
        connection.query('select * from paciente', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            // callback({ array: results, id: null, success: true });
            setPacientes(results);
            console.log(JSON.stringify(pac));
        })
        for(let i = 0; i < pac.length; i++){
            connection.query(`SELECT ID, Fecha, Malestar, Peso, Talla, Temperatura, Presion_A, Pulso, Diagnostico, Nota from consulta join (SELECT * from expediente WHERE ID_Paciente = ${pac[i]['ID']}) as b on b.ID_Consulta = consulta.ID`,(err,results) =>{
                if(err){
                    callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                    return; 
                }
                console.log('Consultas por paciente ' + pac[i]['ID'] + " = " + results);
                pushArray(pac[i],results) // añade al paciente y sus consultas a expedientes
            })
        }
        callback({array: expedientes, id: null, success: true});
    },
    // Get por ID
    getId: (connection, id, callback) => {
        
        paciente = {};
        let consultas = [];
        connection.query('select * from paciente where ID = ' + id, async(err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 

            if(results.length == 0){
                callback({ array: null, id: null, success: false, message: 'No existe el id'}); 
                return;
            }
            setPaciente(results[0]); // define el valor de pc
        })
        connection.query(`SELECT ID, Fecha, Malestar, Peso, Talla, Temperatura, Presion_A, Pulso, Diagnostico, Nota from consulta join (SELECT * from expediente WHERE ID_Paciente = ${id}) as b on b.ID_Consulta = consulta.ID`,async(err, results) =>{
            if(err){
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            }
            setConsulta(results); // define el valor de cl
            // consultas = results;
            // console.log('consultas => ' +JSON.stringify(consultas));
        });
        callback({ paciente: pc, consultas: cl, success: true });
    },
    // Post de expediente
    postExpediente: (connection, body, callback) => {
        connection.query('insert into expediente SET ?', body, (err, results) =>{
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: null, id: null, success: true });
        });
    },
    // Actualizar expediente
    putExpediente: (connection,body,callback) => {
        connection.query('update expediente set Resultado = ? WHERE ID_Paciente = ? and ID_Consulta = ?', [body.Resultado,body.ID_Paciente,body.ID_Consulta], (err, results) => {
            if (err) { 
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) }); 
                return; 
            } 
            callback({ array: null, id: null, success: true });
        })
    }
}