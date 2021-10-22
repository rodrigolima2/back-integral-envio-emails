const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transportador = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "cb25090eca6417",
        pass: "576c32047bb71b"
    }
});

transportador.use('compile', handlebars({
    viewEngine: {
        extname: '.handlebars',
        defaultLayout: false
    },
    viewPath: './views'
}));

module.exports = transportador;