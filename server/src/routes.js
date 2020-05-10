const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Server is up and running');
});

module.exports = routes;