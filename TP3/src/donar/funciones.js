const axios = require('axios').default;
let promesas = [];
for(let i = 0; i < 10; i++){
    promesas.push(
        axios.get('http://localhost:3000/funciones').then(res => {console.log("termina la " +i)})
    );
}

Promise.all(promesas).then(res => {console.log("termine")});