const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes'));

app.use(express.static('frontend'));

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
