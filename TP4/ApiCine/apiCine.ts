import express, { json } from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';    
import { resolve } from 'path';

var mysql = require('mysql');
var pool = mysql.createPool({
  poolLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'alumno1234',
  database : 'cine'
});
const cluster = require('cluster');

if(cluster.isWorker){
    process.on('message', (msg) => {
      pool.getConnection(function(err, con){
        con.beginTransaction(function(err){
        
          if(msg=="funciones"){
            if (err) throw err;
            con.query("SELECT titulo, img FROM funciones WHERE vigente = 1 AND fecha > NOW() FOR UPDATE", function (err, result, fields) {
                if (err) {
                    return con.rollback(function() {
                        throw err;
                    });
                }
                console.log(result)
                con.release();
                process.send(result);
                process.kill(process.pid);
            });
          }else if(msg[0] == 'cancelar'){
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
      });
    });
}

else {
    const cors = require('cors')
    const express = require('express');
    const app = express();
    const port = 3000;

    app.use(cors())

    app.listen(port, () => {
      console.log(`Se levanto el server en http://localhost:${port}`);
    })

    // Configuro algunas cosas del servidor
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    
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
    app.post('/:id_funcion/cancelar_reserva', (req, res) => {
      let user = req.body.user
      let idF = Number(req.params.id_funcion)
      
      let data = new Array
      data.push('cancelar')
      data.push(user)
      data.push(idF)

      const worker = cluster.fork()
      worker.send(data)
      worker.on('message', (result) => {
        res.status(200).send(result);
      });
    })
}