const mongoose = require('mongoose');

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: {type: String, unique: true},
  venta: {type: Boolean, required: true, index: true},
  precio: {type: Number, required: true, index: true},
  foto: String,
  tags: {type: [String],
         enum: ['work', 'lifestyle', 'motor', 'mobile'],
        index: true},
});

// método listar (estático, porque está en el modelo)
anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;