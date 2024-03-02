var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const anuncios = await Anuncio.find();
    res.locals.anuncios = anuncios;
  } catch (error) {
    next(error)
  }

  res.render('index', { title: 'Anuncios', imagesPath: '/images/' });
});

module.exports = router;
