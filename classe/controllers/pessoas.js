const knex = require('../conexao');
const nodemailer = require('../services/nodemailer');

const cadastrar = async (req, res) => {
    const { email, nome } = req.body;

    if (!email || !nome) {
        return res.status(400).json({ mensagem: 'É obrigatório informar o email e o nome.' });
    }

    try {
        const emailValido = await knex('pessoas').where({ email: email });

        if (emailValido.length > 0) {
            return res.status(400).json({ mensagem: 'O email informado já esta sendo utilizado.' });
        }

        const pessoa = await knex('pessoas').insert({ email, nome });

        if (pessoa.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar.' });
        }

        res.status(200).json({ mensagem: 'Cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}

const newsletter = async (req, res) => {
    const { mensagem } = req.body;

    if (!mensagem) {
        res.status(400).json({ mensagem: 'É necessário informar uma mensagem.' });
    }

    try {
        const dadosDoBanco = await knex('pessoas');

        dadosDoBanco.forEach(item => {
            const dadosEnvio = {
                from: 'Rodrigo Lima <nao-responder@rodrigolima.com.br>',
                to: item.email,
                subject: 'Newsletter de hoje',
                template: 'newsletter',
                context: {
                    nome: item.nome,
                    mensagem
                }
                //text: `Olá ${item.nome} \n\n` + mensagem
            }

            nodemailer.sendMail(dadosEnvio);
        });

        res.status(200).json({ mensagem: 'Email enviado com sucesso!' });
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrar,
    newsletter
}