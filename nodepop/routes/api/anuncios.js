var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

// POST /api/anuncios (body)
// Crea un anuncio
router.post('/', async (req, res, next) => {
    try {
      const data = req.body;
  
      // creamos una instancia de anuncio en memoria
      const anuncio = new Anuncio(data);
  
      // lo persistimos en la BD
      const anuncioGuardado = await anuncio.save();
  
      res.json({ result: anuncioGuardado });
  
    } catch (error) {
      next(error);
    }
  });

// GET /api/anuncios 
// Devuelve la lista de anuncios
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
    res.json({ results: anuncios });
  } catch (error) {
    next(error)
  }
});


// GET /api/anuncios/tags
// Devuelve los tags existentes en la BBDD
router.get('/tags', async (req, res, next) => {
  try {
    const id = req.params.id;

    const tags = await Anuncio.distinct('tags');

    res.json({ result: tags });
  } catch (error) {
    next(error);
  }
});


module.exports = router;