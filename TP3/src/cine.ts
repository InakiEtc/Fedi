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

var vueltas = 0
function cambiarEstadoFuncion(){ 
  return new Promise(function (resolve, reject){
    pool.query("update funciones set vigente = 0 where fecha<=now()", function (error, results, fields){
      if (error) throw error;
        this.query = " ";
    });
  });
}

var CronJob = require('cron').CronJob;
var job = new CronJob('5 * * * * *',  async function(){
    console.log('vueltas: '+(vueltas++))
    cambiarEstadoFuncion()
});
job.start();


if(cluster.isWorker){
  process.on('message', (msg) => {
    pool.getConnection(function(err,con){
      con.beginTransaction(function(err){
        if (err) throw err;
        if(msg="funciones"){
          if (err) throw err;
          con.query("SELECT titulo FROM funciones WHERE vigente = 1 AND fecha > NOW() FOR UPDATE", function (err, result, fields) {
              if (err) {
                  return con.rollback(function() {
                      throw err;
                  });
              }
              console.log(result[0].titulo)
              con.release();
              process.send(result[0].titulo);
              process.kill(process.pid);
          });
        }
        else if(msg[0] == 'reservar'){
          con.query("select * from funciones where vigente = 1 and fecha > now() and id = "+msg[1]+" for update", function (err, result, fields) {
            if (err) throw err;
            if(result[0] == null){
              con.release();
              process.send("La funcion que quiere reservar no existe");
              process.kill(process.pid);
            } 
            let butacas = JSON.parse(result[0].butacas_disponibles);
            con.query("select * from reservas where usuario = "+msg[3], function (err, result, fields) {
              if (err) throw err;
              let funciones = new Array();
              result.forEach(x => {
                funciones.push(x.funcion);
              });
              if(funciones.includes(parseInt(msg[1]))){
                con.release();
                process.send("Ya sacaste entradas para esta funcion");
                process.kill(process.pid);
              }
              if(butacas.length < msg[2].length || msg[2].length > 6){
                con.release();
                process.send("No hay butacas suficientes");
                process.kill(process.pid);
              }
              let arrayButacasR = new Array();
              for (let i = 0; i < butacas.length; i++) {
                for (let j = 0; j < msg[2].length; j++) {
                  if (butacas[i] == msg[2][j]){
                    arrayButacasR.push(msg[2][j]);
                    butacas.splice(i,1);
                  }
                }
              }
              butacas = JSON.stringify(butacas);
              let stringButacasR = JSON.stringify(arrayButacasR);
              con.query("insert into reservas values(null,"+msg[3]+","+msg[1]+", '"+stringButacasR+"')", function (err, result, fields) {
                if (err) throw err;
                con.query("update funciones set butacas_disponibles = '"+butacas+"' where id= "+msg[1], function (err, result, fields) {
                  if (err) throw err;
                  if(butacas.length == 0){
                    con.query("update funciones set vigente = 0 and butacas_disponibles = [] where id= "+msg[1], function (err, result, fields) {
                      if (err) throw err;
                    });  
                  }
                  con.commit(function(err) {
                    if (err) {
                      return con.rollback(function() {
                        throw err;
                      });
                    }
                    con.release();
                    console.log(`Se reservo correctamente`);
                    process.send(result);
                    process.kill(process.pid);
                  });
                });
              });  
            });
          });
        }
        else if(msg[0] == 'cancelar'){
          if (err) throw err;
          con.query("START TRANSACTION;", function (err, result, fields) {
            if (err) {
                return con.rollback(function() {
                    throw err;
                });
            }
            con.query("UPDATE funciones INNER JOIN reservas ON reservas.funcion = funciones.id SET funciones.butacas_disponibles = CONCAT( SUBSTRING( funciones.butacas_disponibles, 1, LENGTH( funciones.butacas_disponibles ) -1 ), ',', SUBSTRING( reservas.butacas_reservadas, 2 ) ) WHERE reservas.usuario="+msg[1]+" AND reservas.funcion = "+msg[2]+" AND TIMESTAMPDIFF(HOUR, NOW(), funciones.fecha) > 1", function (err, result, fields) {
              if (err) {
                  return con.rollback(function() {
                      throw err;
                  });
              }
              let resultado = result
              con.query("DELETE reservas FROM reservas INNER JOIN funciones ON funciones.id = reservas.funcion WHERE reservas.usuario = "+msg[1]+" AND reservas.funcion = "+msg[2]+" AND TIMESTAMPDIFF(HOUR, NOW(), funciones.fecha) > 1;", function (err, result, fields) {
                if (err) {
                    return con.rollback(function() {
                        throw err;
                    });
                }
                con.query("COMMIT;", function (err, result, fields) {
                  if (err) {
                      return con.rollback(function() {
                          throw err;
                      });
                  }
                  if(resultado.affectedRows > 0){
                    console.log("Su reserva fue borrada con exito")
                  }else{
                    console.log("El tiempo para cancelar la reserva expiro")
                  }
                  con.release();
                  process.send(resultado);
                  process.kill(process.pid);
                });
              });  
            });
          });
        }
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

  app.get('/funciones', (req, res) => {
    const worker = cluster.fork(); 

    worker.send('funciones');
    worker.on('message', (result) => {
         res.status(200).send(result);
    });
  });
  
  app.post('/:id_funcion/reservar', (req, res) => {
    let idF = req.param('id_funcion');
    let butacasreservar = req.body.butacas;
    let idUser = req.body.usuario;

    let msg = new Array;
    msg.push('reservar');
    msg.push(idF);
    msg.push(butacasreservar);
    msg.push(idUser);

    const worker = cluster.fork();
    worker.send(msg);
    worker.on('message', (result) => {
         res.status(200).send(result);
    });
      
  });
  
  app.post('/:id_funcion/cancelar_reserva', (req, res) => {
    let user = req.body.user;
    let idF = Number(req.params.id_funcion);
    
    let data = new Array;
    data.push('cancelar');
    data.push(user);
    data.push(idF);

    const worker = cluster.fork();
    worker.send(data);
    worker.on('message', (result) => {
      res.status(200).send(result);
    });
  });
}


