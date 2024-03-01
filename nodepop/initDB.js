'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const anunciosIniciales = require('./initialData/anuncios.json');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  // esperar a que se conecte a la BBDD
  await new Promise((resolve) => connection.once('open', resolve) )

  const borrar = await pregunta('Estas seguro que quieres borrar el contenido de esta BD? (no)')
  if (!borrar) {
    process.exit();
  }

  await initAnuncios();

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