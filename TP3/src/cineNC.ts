const mysql = require('mysql');
const pool = mysql.createPool({
host     : 'localhost',
user     : 'root',
password : 'pelaroot',
database : 'cine',
port     : '3306'

});

const bodyParser = require('body-parser');

pool.getConnection(function(err,con) {
  if (err) throw err;
  console.log('Se conecto correctamente a mySQL');
});

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
  pool.getConnection(function(err,con){
    if (err) throw err;
    con.query("SELECT titulo FROM funciones WHERE vigente = 1 AND fecha > NOW()", function (err, result, fields) {
        if (err) {
            return con.rollback(function() {
                throw err;
            });
        }
        res.json(result[0].titulo);
    });
  })
});

app.post('/:id_funcion/reservar', (req, res) => {
  let idF = req.param('id_funcion');
  let butacasreservar = req.body.butacas;
  let idUser = req.body.usuario;

  let msg = new Array;
  msg.push(idF);
  msg.push(butacasreservar);
  msg.push(idUser);

  pool.getConnection(function(err,con){
    if (err) throw err;
    con.query("select * from funciones where vigente = 1 and fecha > now() and id = "+msg[0], function (err, result, fields) {
      if (err) throw err;
      if(result[0] == null){
        console.log("La funcion que quiere reservar no existe");
      } 
      let butacas = JSON.parse(result[0].butacas_disponibles);
      con.query("select * from reservas where usuario = "+msg[2], function (err, result, fields) {
        if (err) throw err;
        let funciones = new Array();
        result.forEach(x => {
          funciones.push(x.funcion);
        });
        if(funciones.includes(parseInt(msg[0]))){
          console.log("Ya sacaste entradas para esta funcion");
        }
        if(butacas.length < msg[1].length || msg[1].length > 6){
          console.log("No hay butacas suficientes");
        }
        let arrayButacasR = new Array();
        for (let i = 0; i < butacas.length; i++) {
          for (let j = 0; j < msg[1].length; j++) {
            if (butacas[i] == msg[1][j]){
              arrayButacasR.push(msg[1][j]);
              butacas.splice(i,1);
            }
          }
        }
        butacas = JSON.stringify(butacas);
        let stringButacasR = JSON.stringify(arrayButacasR);
        con.query("insert into reservas values(null,"+msg[2]+","+msg[0]+", '"+stringButacasR+"')", function (err, result, fields) {
          if (err) throw err;
          con.query("update funciones set butacas_disponibles = '"+butacas+"' where id= "+msg[0], function (err, result, fields) {
            if (err) throw err;
            if(butacas.length == 0){
              con.query("update funciones set vigente = 0 and butacas_disponibles = [] where id= "+msg[0], function (err, result, fields) {
                if (err) throw err;
              });  
            }
            console.log(`Se reservo correctamente`);
            });
          });
        });  
      });
    });
  });

app.post('/:id_funcion/cancelar_reserva', (req, res) => {
  let user = req.body.user;
  let idF = Number(req.params.id_funcion);
  
  let msg = new Array;
  msg.push(user);
  msg.push(idF);

  pool.getConnection(function(err,con){
    if (err) throw err;
    con.query("UPDATE funciones INNER JOIN reservas ON reservas.funcion = funciones.id SET funciones.butacas_disponibles = CONCAT( SUBSTRING( funciones.butacas_disponibles, 1, LENGTH( funciones.butacas_disponibles ) -1 ), ',', SUBSTRING( reservas.butacas_reservadas, 2 ) ) WHERE reservas.usuario="+msg[0]+" AND reservas.funcion = "+msg[1]+" AND TIMESTAMPDIFF(HOUR, NOW(), funciones.fecha) > 1", function (err, result, fields) {
      if (err) throw err;
      let resultado = result
      con.query("DELETE reservas FROM reservas INNER JOIN funciones ON funciones.id = reservas.funcion WHERE reservas.usuario = "+msg[0]+" AND reservas.funcion = "+msg[1]+" AND TIMESTAMPDIFF(HOUR, NOW(), funciones.fecha) > 1;", function (err, result, fields) {
        if (err) throw err;
        if(resultado.affectedRows > 0){
          console.log("Su reserva fue borrada con exito")
        }else{
          console.log("El tiempo para cancelar la reserva expiro")
        }
        console.log("termine")
      });
    });  
  });
})


