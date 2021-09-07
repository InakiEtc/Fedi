const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Se levanto el server en http://localhost:${port}`);
})

var requestIp = require('request-ip');
app.get('/', (req, res) => {
  var clientIp = requestIp.getClientIp(req);
  res.send('prende eso?'+clientIp);
})