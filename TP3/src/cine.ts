const mysql = require('mysql');
const pool = mysql.createPool({
host     : 'localhost',
user     : 'root',
password : 'pelaroot',
database : 'cine'
});
const cluster = require('cluster');
const bodyParser = require('body-parser');


pool.getConnection(function(err,con) {
  if (err) throw err;
  console.log('Se conecto correctamente a mySQL');
});


if(cluster.isWorker){
  process.on('message', (reservar) => {
    //console.log(reservar)
    pool.getConnection(function(err,con){
      con.beginTransaction(function(err){
          if (err) throw err;
          con.query("select * from funciones where vigente = 1 and fecha > now() and id = "+reservar.idF+" for update", function (err, result, fields) {
            if (err) throw err;
            let funciones = new Array();
            result.forEach(x => {
              funciones.push(x.id);
            });
            let butacas = JSON.parse(result.butacas_disponibles);
            if(funciones == null) return "La funcion que quiere reservar no existe";
            con.query("select * from reservas where usuario = "+reservar.idUser+" for update", function (err, result, fields) {
              if (err) throw err;
              let funciones2 = new Array();
              result.forEach(x => {
                funciones2.push(x.funcion);
              });
              if(funciones2.includes(reservar.getidF)) return "Ya sacaste entradas para esta funcion";
              if(butacas.length < reservar.butacasReservar.length && reservar.butacasReservar.length <= 6)return "No hay butacas suficientes";
              let arrayButacasR = [];
              for (let i = 0; i < butacas.length; i++) {
                for (let j = 0; j < reservar.butacasReservar.length; j++) {
                  if (butacas[i] == reservar.butacasReservar[j]){
                    arrayButacasR.push(reservar.butacasReservar[j]);
                    delete butacas[i];
                  }
                }
              }
              butacas = JSON.stringify(butacas);
              let stringButacasR = JSON.stringify(arrayButacasR)
              if(butacas.length == 0){
                con.query("update funciones set vigente = 0 and butacas_disponibles = []", function (err, result, fields) {
                  if (err) throw err;
                });  
              }
              con.query("update funciones set butacas_disponibles = "+stringButacasR, function (err, result, fields) {
                if (err) throw err;
              });  
              con.query("insert into reservas values(null,"+reservar.idUser+","+reservar.idF+","+stringButacasR+")", function (err, result, fields) {
                if (err) throw err;
              });  
            });
          });
      });
    })
  });
}
else{
  const express = require('express');
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(port, () => {
    console.log(`Se levanto el server en http://localhost:${port}`);
  })

  app.get('/', (req, res) => {
    res.send('prende eso?');
  })

  app.get('/funciones', async (req, res) => {

  })
  
  app.post('/:id_funcion/reservar', (req, res) => {
    let idF = req.param('id_funcion');
    let butacasReservar = req.body.butacas;
    let idUser = req.body.usuario;

    let reservar = new Array;
    reservar.push(idF);
    reservar.push(butacasReservar);
    reservar.push(idUser);

    const worker = cluster.fork();
    worker.send(reservar);
    worker.on('message', (result) => {
         res.status(200).send(result);
    });
      
  })
  
  app.post('/:id_funcion/cancelar_reserva', (req, res) => {
      
  })
}


