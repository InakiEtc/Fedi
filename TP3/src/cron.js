var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'alumno1234',
  database : 'cine'
});

var vueltas = 0

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Se conecto correctamente a mySQL');
});

function cambiarEstadoFuncion(){ 
    return new Promise(function (resolve, reject){
      connection.query("update funciones set vigente = 0 where fecha<=now()", function (error, results, fields){
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