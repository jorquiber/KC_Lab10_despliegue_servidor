'use strict';

require('dotenv').config();

const amqplib = require('amqplib');

const QUEUE_NAME = 'thumbnail_processing';

async function publisher(message) {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.AMQP_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe un exchange
  await canal.assertQueue(QUEUE_NAME, 
    {
     durable: true 
    });

  canal.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });

  console.log('Mensaje enviado a la cola', message);

}

module.exports = publisher;