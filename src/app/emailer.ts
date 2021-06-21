/*const nodemailer = require ('nodemailer')

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

exports.sendMail = () => sendMail()*/