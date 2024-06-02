var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const filterConfiguration = require('../lib/filterConfiguration');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const filter = filterConfiguration(req);

    const anuncios = await Anuncio.listar(filter.filter, filter.skip, filter.limit, filter.sort, filter.fields);

    res.locals.anuncios = anuncios;
  } catch (error) {
    next(error)
  }

  res.render('index', { title: 'Nodepop', imagesPath: '/images/' });
});

module.exports = router;
