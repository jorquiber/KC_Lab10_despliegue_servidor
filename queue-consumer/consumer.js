'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const jimp = require('jimp');
const path = require('node:path');

const QUEUE_NAME = 'thumbnail_processing';

main().catch(err => console.log('Hubo un error', err));

async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.AMQP_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe la cola de entrada
  await canal.assertQueue(QUEUE_NAME, {
    durable: true
  });


  canal.consume(QUEUE_NAME, async (message) => {
    if (message !== null) {
      await processImage(message);
      canal.ack(message);
    }
  });

  console.log('Consumidor iniciado, esperando mensajes...');
}

async function processImage(message) {
  const { imagePath } = JSON.parse(message.content.toString());

  try {
    const image = await jimp.read(imagePath);
    const thumbnailPath = path.join(
      path.dirname(imagePath),
      `thumbnail-${path.basename(imagePath)}`
    );
    
    await image.resize(100, 100).writeAsync(thumbnailPath);
    console.log('Thumbnail creado en', thumbnailPath);
  } catch (error) {
    console.error('Error procesando imagen', error);
  }
}