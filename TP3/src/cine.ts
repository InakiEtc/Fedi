var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pelaroot',
  database : 'cine'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Se conecto correctamente a mySQL');
});

const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Se levanto el server en http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.send('prende eso?');
})

function funcionesDisponibles(){ 
  return new Promise(function (resolve, reject){
      connection.query("select titulo from funciones where vigente = 1 and fecha > now()"
      , function (error, results, fields){
      if (error) throw error;
          resolve(results)
      });
  });
}

app.get('/funciones', async (req, res) => {
  let funciones = await funcionesDisponibles();
  res.json(funciones);
})

app.post('/reservar', (req, res) => {
    
})

app.post('/cancelar_reserva', (req, res) => {
    
})

