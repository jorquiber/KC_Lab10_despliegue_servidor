'use strict';

require('dotenv').config();

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');
const anunciosIniciales = require('./initialData/anuncios.json');
const usuariosIniciales = require('./initialData/usuarios.json');
const e = require('express');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // esperar a que se conecte a la BBDD
  await new Promise((resolve) => connection.once('open', resolve) )

  const borrar = await pregunta('Estas seguro que quieres borrar el contenido de esta BD? (no)')
  if (!borrar) {
    process.exit();
  }

  await initAnuncios();
  await initUsuarios();

  connection.close();

}

async function initAnuncios() {
  // borrar todos los anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany(anunciosIniciales.anuncios);
  console.log(`Creados ${inserted.length} anuncios.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}

async function initUsuarios() {
  // borrar todos los usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios iniciales
  const hashedUsers = await Promise.all(
    usuariosIniciales.usuarios.map(async usuario => ({
      email: usuario.email, 
      password: await Usuario.hashPassword(usuario.password)
    }))
  );
  
  const inserted = await Usuario.insertMany(hashedUsers);

  console.log(`Creados ${inserted.length} usuarios.`);
}