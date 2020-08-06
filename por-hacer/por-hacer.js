const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = []

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err)
            throw new Error(err);
        else
            return './db/data.json';
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }

    return false;

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    }
    return false;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}