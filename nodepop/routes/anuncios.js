'use strict';

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const Anuncio = require('mongoose').model('Anuncio');
const { buildAnuncioFilterFromReq } = require('../lib/utils');

/* GET anuncios page. */
router.get('/', asyncHandler(async function (req, res) {
  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';

  const filters = buildAnuncioFilterFromReq(req);
  const rows = await Anuncio.listar(filters, start, limit, sort);

  res.locals.anuncios = rows;
  res.render('anuncios',{ imagesPath: '/images/'});

}));

module.exports = router;
