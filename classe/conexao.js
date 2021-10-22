const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'asd',
        database: 'newsletter'
    }
});

module.exports = knex;