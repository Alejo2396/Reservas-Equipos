const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.static('frontend'));
app.use('/api', routes);

app.listen(3000,()=>console.log('Servidor corriendo en http://localhost:3000'));
