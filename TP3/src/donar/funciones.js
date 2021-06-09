const axios = require('axios').default;
let promesas = [];
let segundosInicio;
for(let i = 0; i < 50; i++){
    segundosInicio=new Date();
    promesas.push(
        axios.get('http://localhost:3000/funciones').then(res => {console.log("Tardo ",i,new Date()-segundosInicio)})
    );
}

Promise.all(promesas).then(res => {console.log("termine")});