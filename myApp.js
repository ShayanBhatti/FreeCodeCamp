const express = require('express');
const app = express();
const helmet = require('helmet');



app.use(helmet.hidePoweredBy({setTo: '4.2.0'})); //By this we have hide the powered  by option like e.g powered BY express

app.use(helmet.frameguard({action:'deny'})); //mitigate the risk of iframe  thorugh attack



app.use(helmet.xssFilter()); // Help against the cross site scripting malicious code injection
app.use(helmet.noSniff()); 
app.use(helmet.ieNoOpen());
//Middle ware for browswer for using only https for 90 days 
const timeInSecond = 90*24*60*60;
app.use(helmet.hsts({maxAge:timeInSecond, force:true}));

 




































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
  console.log(`User Program info started on port ${port}`);
});
