const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// creamos esquema
const usuarioSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// método estático que hace hash de una contraseña
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 10);
};

// método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

// creamos el modelo de usuarios
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

