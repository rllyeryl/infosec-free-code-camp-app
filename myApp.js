const express = require('express');
const helmet = require('helmet');
const app = express();

const api = require('./server.js');

app.use(helmet.hidePoweredBy());
app.use(helmet());

app.use(express.static('public'));
app.disable('strict-transport-security');

app.use('/_api', api);



app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Eryl Jana Carillo Information Security App started on Port ${port}`);
});














































