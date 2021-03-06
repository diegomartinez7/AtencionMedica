const express = require('express')
const user = require('../user.model'); // obtiene las operaciones para usuarios
const paciente = require('../paciente.model'); // obtiene las operaciones para pacientes
const consulta = require('../consulta.model'); // obtiene las operaciones para consultas
const exp = require('../expediente.model'); // obtiene las operaciones para expedientes
const connection = require('../conexion')
const connection2 = require('../conexion')
const {body, param, validationResult} = require('express-validator');
var router = express.Router();
const nodemailer = require ('nodemailer')

var arraySolicitudes = []

// -------------------DIRECIONES DE USUARIO
//obtener todos los usuarios
router.get('/usuario', [], (req, res) => {
    user.getAll(connection, (data => { 
        res.json(data); 
    }));
});
// obbtener usuario por id
router.get('/usuario/:id', [ 
    param('id').not().isEmpty().isNumeric(),
],(req,res) =>{
    const errors = validationResult(req); 
    // Validación del parámetro
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }
    let id = req.params.id; 
    user.getId(connection, id, (data => { 
        res.json(data); 
    }));
});

//añadir un nuevo usuario
router.post('/usuario', [
    body('Nombre').not().isEmpty().isString(),
    body('Apellidos').not().isEmpty().isString(),
    body('Correo').not().isEmpty().isString(),
    body('Contrasena').not().isEmpty().isString(),
    body('Telefono').not().isEmpty().isString(),
    body('Tipo').not().isEmpty().isNumeric(),
    body('Disponibilidad').not().isEmpty().isNumeric()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    user.postUser(connection, body, (data => { 
        res.json(data); 
    }))
});

//actualizar usuario
router.put('/usuario/:id', [ 
    body('Nombre').not().isEmpty().isString(),
    body('Apellidos').not().isEmpty().isString(),
    body('Correo').not().isEmpty().isString(),
    body('Contrasena').not().isEmpty().isString(),
    body('Telefono').not().isEmpty().isString(),
    body('Tipo').not().isEmpty().isNumeric(),
    body('Disponibilidad').not().isEmpty().isNumeric(),
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    let id = req.params.id;
    user.putUser(connection, id, body, (data => { 
        res.json(data); 
    }))
});

// borrar usuario
router.delete('/usuario/:id', [
    param('id').not().isEmpty().isNumeric()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let id = req.params.id; 
    user.deleteUser(connection, id, (data => { 
        res.json(data); 
    }))
});

// -------------------DIRECIONES DE PACIENTE

//obtener todos los pacientes
router.get('/paciente', [], (req, res) => {
    paciente.getAll(connection, (data => { 
        res.json(data); 
    }));
});

//obtener paciente por id
router.get('/paciente/:id', [ 
    param('id').not().isEmpty().isNumeric(),
],(req,res) =>{
    const errors = validationResult(req); 
    // Validación del parámetro
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }
    let id = req.params.id; 
    paciente.getId(connection, id, (data => { 
        res.json(data); 
    }));
});

//añadir un nuevo paciente
router.post('/paciente', [
    body('Nombre').not().isEmpty().isString(),
    body('Apellidos').not().isEmpty().isString(),
    body('Genero').not().isEmpty().isString(),
    body('Edad').not().isEmpty().isNumeric(),
    body('Nivel_S').not().isEmpty().isString(),
    body('Poblacion').not().isEmpty().isString(),
    body('Tipo_E').not().isEmpty().isString(),
    body('Enfermedades').not().isEmpty().isString()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    paciente.postPaciente(connection, body, (data => { 
        res.json(data); 
    }))
});

// actualizar paciente
router.put('/paciente', [ 
    body('Nombre').not().isEmpty().isString(),
    body('Apellidos').not().isEmpty().isString(),
    body('Genero').not().isEmpty().isString(),
    body('Edad').not().isEmpty().isNumeric(),
    body('Nivel_S').not().isEmpty().isString(),
    body('Poblacion').not().isEmpty().isString(),
    body('Tipo_E').not().isEmpty().isString(),
    body('Enfermedades').not().isEmpty().isString(),
    body('Id').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body; 
    paciente.putPaciente(connection, body, (data => { 
        res.json(data); 
    }))
});

//borrar paciente
router.delete('/paciente', [
    body('Id').not().isEmpty().isNumeric()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    paciente.deletePaciente(connection, body, (data => { 
        res.json(data); 
    }))
});

// -------------------DIRECIONES DE CONSULTA

//obtener todas las consultas
router.get('/consulta', [], (req, res) => {
    consulta.getAll(connection, (data => { 
        res.json(data); 
    }));
});

//obtener consulta por id
router.get('/consulta/:id', [ 
    param('id').not().isEmpty().isNumeric(),
],(req,res) =>{
    const errors = validationResult(req); 
    // Validación del parámetro
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }
    let id = req.params.id; 
    consulta.getId(connection, id, (data => { 
        res.json(data); 
    }));
});

// añadir una consulta
router.post('/consulta', [
    body('Fecha').not().isEmpty().isString(),
    body('Malestar').not().isEmpty().isString(),
    body('Peso').not().isEmpty().isNumeric(),
    body('Talla').not().isEmpty().isNumeric(),
    body('Temperatura').not().isEmpty().isNumeric(),
    body('Presion_A').not().isEmpty().isString(),
    body('Pulso').not().isEmpty().isString(),
    body('Diagnostico').not().isEmpty().isString(),
    body('Nota').not().isEmpty().isString()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    consulta.postConsulta(connection, body, (data => { 
        res.json(data); 
    }))
});

// actualizar consulta 
router.put('/consulta', [ 
    body('Fecha').not().isEmpty().isString(),
    body('Malestar').not().isEmpty().isString(),
    body('Peso').not().isEmpty().isNumeric(),
    body('Talla').not().isEmpty().isNumeric(),
    body('Temperatura').not().isEmpty().isNumeric(),
    body('Presion_A').not().isEmpty().isString(),
    body('Pulso').not().isEmpty().isString(),
    body('Diagnostico').not().isEmpty().isString(),
    body('Nota').not().isEmpty().isString(),
    body('Id').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body; 
    consulta.putConsulta(connection, body, (data => { 
        res.json(data); 
    }))
});

// borrar consulta
router.delete('/consulta', [
    body('Id').not().isEmpty().isNumeric()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    consulta.deleteConsulta(connection, body, (data => { 
        res.json(data); 
    }))
});

// -------------------DIRECIONES DE EXPEDIENTE

//obtener todos los expedientes
router.get('/expediente', [], (req, res) => {
    exp.getAll(connection, (data => { 
        res.json(data); 
    }));
});

//obtener expediente por Id
router.get('/expediente/:id', [ 
    param('id').not().isEmpty().isNumeric(),
],(req,res) =>{
    const errors = validationResult(req); 
    // Validación del parámetro
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }
    let id = req.params.id; 
    exp.getId(connection, id, (data => { 
        res.json(data); 
    }));
});

//añadir expediente
router.post('/expediente', [
    body('ID_Paciente').not().isEmpty().isNumeric(),
    body('ID_Consulta').not().isEmpty().isNumeric(),
    body('Resultado').not().isEmpty().isString()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    exp.postExpediente(connection, body, (data => { 
        res.json(data); 
    }))
});

// actualizar expediente
router.put('/expediente', [
    body('ID_Paciente').not().isEmpty().isNumeric(),
    body('ID_Consulta').not().isEmpty().isNumeric(),
    body('Resultado').not().isEmpty().isString()
],(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.json({success:false,err:JSON.stringify(errors)}) 
        return 
    }

    let body = req.body;
    exp.putExpediente(connection, body, (data => { 
        res.json(data); 
    }))
});

// ------------------------ SOLICITUDES DE CONSULTA

// Alta de solicitudes, recibe un body con los campos de consulta
router.post('/solicitud/:id',[
    param('id').not().isEmpty().isNumeric(),
    body('Fecha').not().isEmpty().isString(),
    body('Malestar').not().isEmpty().isString(),
    body('Peso').not().isEmpty().isNumeric(),
    body('Talla').not().isEmpty().isNumeric(),
    body('Temperatura').not().isEmpty().isNumeric(),
    body('Presion_A').not().isEmpty().isString(),
    body('Pulso').not().isEmpty().isNumeric(),
    body('Diagnostico').not().isEmpty().isString(),
    body('Nota').not().isEmpty().isString()
], (req,res) =>{
    // añade al arraySolicitudes una nueva soicitud
    arraySolicitudes.push({ 'ID': req.params.id, 'solicitud': req.body});
    // console.log('dentro ',JSON.stringify(arraySolicitudes));
    res.json({status: 200, success: true}) // retorna un json exitoso
});

// Obtiene todas las solicitudes
router.get('/solicitud',[],(req,res) =>{
    res.json({solicitudes: arraySolicitudes,status: 200,success: true})
})

//Elimina un elemento de arraySolicitudes en el index especificado
router.get('/solicitud/:index',[
    param('index').not().isEmpty().isNumeric(),
],(req,res) =>{
    let solicitud = {};
    if(arraySolicitudes.length > 0){
        solicitud = arraySolicitudes[req.params.index]; // recupera el objeto a eliminar, pues se va a aceptar esta solicitud
        arraySolicitudes.splice(req.params.index,1)
        // console.log('new =>',JSON.stringify(arraySolicitudes));
        res.json({solicitud: solicitud, status: 200, success: true}) // devuelve el objeto elimnaod del arreglo y que se va a atender
    }else{
        res.json({solicitud: {}, status: 404, success: false})
    }
})


const createTrans = () =>{
    const transport = nodemailer.createTransport({
        host: "localhost",
        port: 3308
    });
    return transport;
}

const sendMail = async () => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"SISSSTEM" <SISSSTEM@gmail.com>',
        to: "didihdzmoli@gmail.com",
        subject: "Correo de confirmacion de nuevo Usuario :)",
        html: "<b>Nuevo Usuario Registrado en la Base de Datos<b>",
    });
    console.log("Message sent: %s", info.messageId);

    return
}

exports.sendMail = () => sendMail()

module.exports = router;