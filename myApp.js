const express = require('express');
// 1. required helmet here:
const helmet = require('helmet'); 
const app = express();

// 2. used helmet.hidePoweredby here:
app.use(helmet.hidePoweredBy()); 
// 3. used helmet.frameguard here:
app.use(helmet.frameguard({ action: 'deny' }));
// 4. used helmet.xssFilter to help mitigate Cross-Site Scripting (XSS) attacks
app.use(helmet.xssFilter());
// 5. used helmet.noSniff to prevent the browser from "sniffing" the MIME type
app.use(helmet.noSniff());
// 6. used helmet.ieNoOpen to prevents IE from executing downloads in site's context
app.use(helmet.ieNoOpen());
// 7. HSTS configuration
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ 
  maxAge: ninetyDaysInSeconds, 
  force: true 
}));

// NEW 8. Disable DNS Prefetching
app.use(helmet.dnsPrefetchControl());

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});