const axios = require('axios').default;
let promesas = [];
let segundosInicio = new Date();
promesas.push(
    axios.post('http://localhost:3000/4/reservar', {usuario: '1',butacas: ["b3"]}).then(res => {console.log("Tardo 1",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '2',butacas: ["b4"]}).then(res => {console.log("Tardo 2",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '3',butacas: ["c2"]}).then(res => {console.log("Tardo 3",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '4',butacas: ["c3"]}).then(res => {console.log("Tardo 4",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '5',butacas: ["c4"]}).then(res => {console.log("Tardo 5",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '6',butacas: ["d1"]}).then(res => {console.log("Tardo 6",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '7',butacas: ["d2"]}).then(res => {console.log("Tardo 7",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '8',butacas: ["d3"]}).then(res => {console.log("Tardo 8",new Date()-segundosInicio)}),
    axios.post('http://localhost:3000/4/reservar', {usuario: '9',butacas: ["f1"]}).then(res => {console.log("Tardo 9",new Date()-segundosInicio)}),
);

Promise.all(promesas).then(res => {console.log("termine")});