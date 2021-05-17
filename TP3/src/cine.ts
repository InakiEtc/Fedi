function Conexion(){
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pelaroot',
  database : 'cine'
  });

  return connection;
}

Conexion().connect(function(err) {
  if (err) throw err;
  console.log('Se conecto correctamente a mySQL');
});

const cluster = require('cluster');

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
      Conexion().query("select titulo from funciones where vigente = 1 and fecha > now()", function (error, results, fields){
        if (error) throw error;
        resolve(results)
      });
  });
}

if(cluster.isWorker){
  process.on('message', (reserva) => {
      Conexion().beginTransaction(function(err){
          if (err) throw err;
          Conexion().query("select * from funciones where vigente = 1 and fecha > now() and id = "+idF, function (err, result, fields) {
            if (err) throw err;
            let funciones = new Array();
            result.forEach(x => {
              funciones.push(x.id);
            });
            if(funciones.includes(idF) == false) return "La funcion que quiere reservar no existe";
            Conexion().query("select * from reservas where usuario = "+/*idUsuari*/+" for update", function (err, result, fields) {
              if (err) throw err;
              let funciones2 = new Array();
              result.forEach(x => {
                funciones2.push(x.funcion);
              });
              if(funciones2.includes(idF)) return "Ya sacaste entradas para esta funcion";

            });

          });
      });
  });
}

app.get('/funciones', async (req, res) => {
  let funciones = await funcionesDisponibles();
  res.json(funciones);
})

app.post('/:id_funcion/reservar', (req, res) => {
  var idF = req.param('id_funcion');
    
})

app.post('/:id_funcion/cancelar_reserva', (req, res) => {
    
})

