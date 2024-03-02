var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const filterByTag = req.query.tags;
    const filterByVenta = req.query.venta;
    const filterMinPrecio = req.query.minPrecio;
    const filterMaxPrecio = req.query.maxPrecio;
    const filterNombreStartWith = req.query.nombreStartWith;

    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;

    const filter = {};

    // filtro por tag
    if (filterByTag) {
      filter.tags = {'$all': filterByTag };
      console.log(filterByTag);
    }

    // filtro por venta
    if (filterByVenta) {
      filter.venta = filterByVenta;
    }

    // filtro por precio
    if (filterMinPrecio && filterMaxPrecio) {
      filter.precio =  {'$gte': filterMinPrecio, '$lte': filterMaxPrecio};
    } else if (filterMaxPrecio) {
      filter.precio = {'$lte': filterMaxPrecio};
    } else if (filterMinPrecio) {
      filter.precio =  {'$gte': filterMinPrecio};
    }

    // filtro por comienzo de nombre
    if (filterNombreStartWith) {
      filter.nombre = {'$regex': '^' + filterNombreStartWith, $options: 'i'};
    }

    const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);

    res.locals.anuncios = anuncios;
  } catch (error) {
    next(error)
  }

  res.render('index', { title: 'Anuncios', imagesPath: '/images/' });
});

module.exports = router;
