const mysql = require('mysql');
const pool = mysql.createPool({
host     : 'localhost',
user     : 'root',
password : 'pelaroot',
database : 'cine',
port     : '3306'
});

const cluster = require('cluster');
const bodyParser = require('body-parser');


pool.getConnection(function(err,con) {
  if (err) throw err;
  console.log('Se conecto correctamente a mySQL');
});


if(cluster.isWorker){
  process.on('message', (reservar) => {
    pool.getConnection(function(err,con){
      con.beginTransaction(function(err){
          if (err) throw err;
          con.query("select * from funciones where vigente = 1 and fecha > now() and id = "+reservar[0]+" for update", function (err, result, fields) {
            if (err) throw err;
            if(result[0] == null) return console.log("La funcion que quiere reservar no existe");
            let butacas = JSON.parse(result[0].butacas_disponibles);
            con.query("select * from reservas where usuario = "+reservar[2], function (err, result, fields) {
              if (err) throw err;
              let funciones = new Array();
              result.forEach(x => {
                funciones.push(x.funcion);
              });
              if(funciones.includes(reservar[0])) return "Ya sacaste entradas para esta funcion";
              if(butacas.length < reservar[1].length && reservar[1].length <= 6)return "No hay butacas suficientes";//mepa que funca mal
              let arrayButacasR = new Array();
              for (let i = 0; i < butacas.length; i++) {
                for (let j = 0; j < reservar[1].length; j++) {
                  if (butacas[i] == reservar[1][j]){
                    arrayButacasR.push(reservar[1][j]);
                    butacas.splice(i,1);
                  }
                }
              }
              butacas = JSON.stringify(butacas);
              let stringButacasR = JSON.stringify(arrayButacasR)
              con.query("insert into reservas values(null,"+reservar[2]+","+reservar[0]+", '"+stringButacasR+"')", function (err, result, fields) {
                if (err) throw err;
                console.log("Se reservo correctamente");
                con.query("update funciones set butacas_disponibles = '"+butacas+"' where id= "+reservar[0], function (err, result, fields) {
                  if (err) throw err;
                  console.log("Se actualizo las butacas disponibles");
                })
                if(butacas.length == 0){
                  con.query("update funciones set vigente = 0 and butacas_disponibles = [] where id= "+reservar[0], function (err, result, fields) {
                    if (err) throw err;
                  });  
                }
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


