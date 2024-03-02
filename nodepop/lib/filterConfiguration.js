function filterConfiguration (req){

    const filter = {};
    filter.skip = req.query.start;
    filter.limit = req.query.limit;
    filter.sort = req.query.sort;
    filter.fields = req.query.fields;

    const filterByTag = req.query.tag;
    const filterByVenta = req.query.venta;
    const filterPrecio = req.query.precio;
    const filterNombreStartWith = req.query.nombre;

    filter.filter = {};

    // filtro por tag
    if (filterByTag) {
      filter.filter.tags = {'$all': filterByTag };
      console.log(filterByTag);
    }

    // filtro por venta
    if (filterByVenta) {
      filter.filter.venta = filterByVenta;
    }

    // filtro por precio
    if (filterPrecio) {
        const precios = filterPrecio.split('-');
        if (precios.length === 1) {
            filter.filter.precio = precios[0];
        } else if (precios.length === 2) {
            if (precios[0] && precios[1]) {
                filter.filter.precio = { '$gte': precios[0], '$lte': precios[1] };
            } else if (precios[0]) {
                filter.filter.precio = { '$gte': precios[0] };
            } else if (precios[1]) {
                filter.filter.precio = { '$lte': precios[1] };
            }
        }
    }

    // filtro por comienzo de nombre
    if (filterNombreStartWith) {
      filter.filter.nombre = {'$regex': '^' + filterNombreStartWith, $options: 'i'};
    }

    return filter;
}

module.exports = filterConfiguration;