const express = require('express');

const AccountsRouter = require('./routers/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h2>Node-DB1-Project<h2>');
})

module.exports = server;