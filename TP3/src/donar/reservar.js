const axios = require('axios').default;
let promesas = [];
promesas.push(
    axios.post('http://localhost:3000/4/reservar', {usuario: '1',butacas: ["b3"]}).then(res => {console.log("se resevo 1")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '2',butacas: ["b4"]}).then(res => {console.log("se resevo 2")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '3',butacas: ["c2"]}).then(res => {console.log("se resevo 3")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '4',butacas: ["c3"]}).then(res => {console.log("se resevo 4")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '5',butacas: ["c4"]}).then(res => {console.log("se resevo 5")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '6',butacas: ["d1"]}).then(res => {console.log("se resevo 6")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '7',butacas: ["d2"]}).then(res => {console.log("se resevo 7")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '8',butacas: ["d3"]}).then(res => {console.log("se resevo 8")}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '9',butacas: ["f1"]}).then(res => {console.log("se resevo 9")}),
);

Promise.all(promesas).then(res => {console.log("termine")});