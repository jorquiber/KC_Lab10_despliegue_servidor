# NodePop

Este proyecto consiste en una aplicación Node.js llamada NodePop para el laboratorio del módulo 'Desarrollo Backend con Node.js'  del bootcamp 'Desarrollo Web Full Stack' de 'KeepCoding Tech School'.

NodePop es una aplicación que proporciona una plataforma para publicar y buscar anuncios. Utiliza Node.js en el backend para gestionar las solicitudes de los usuarios y proporcionar respuestas dinámicas a través de un API RESTful. La aplicación incluye características como la creación de anuncios, la búsqueda de anuncios por diversos criterios y la visualización de los anuncios en una interfaz de usuario amigable.


## Descarga del repositorio

Puedes clonar el repositorio utilizando el siguiente comando de git:

```bash
git clone git@github.com:jorquiber/KC_Lab5_desarrollo_backend_nodejs.git
```


## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la terminal desde la raíz del proyecto:

```bash
npm install
```

## Inicialización de la base de datos

Antes de ejecutar la aplicación, necesitas inicializar la base de datos. Ten en cuenta que el siguiente comando borrará todo el contenido de la base de datos actual:

```bash
npm run initDB
```

## Desarrollo

Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Este comando iniciará la aplicación y estará listo para el desarrollo, lo que significa que se recargará automáticamente cuando realices cambios en el código.

## Documentación del API

### Crear un anuncio

Endpoint: `POST /apiv1/anuncios`

Descripción: Este endpoint crea un nuevo anuncio con los datos proporcionados en el cuerpo de la solicitud.

#### Parámetros de entrada

- Cuerpo de la solicitud: Debe contener los datos del anuncio a crear, incluyendo `nombre`, `venta`, `precio`, `foto` (opcional) y `tags`.

#### Respuesta

- Código de estado 200: Indica que el anuncio se ha creado correctamente.
- Código de estado 500: Indica un error interno del servidor si no se puede crear el anuncio.

### Obtener la lista de anuncios

Endpoint: `GET /apiv1/anuncios`

Descripción: Este endpoint devuelve la lista de anuncios según los filtros especificados en los parámetros de la consulta.

#### Parámetros de entrada

- Query string: Puedes especificar los siguientes filtros:
  - `tag`: Filtrar por etiqueta. Por ejemplo, `?tag=work` para mostrar solo los anuncios con la etiqueta "work".
  - `venta`: Filtrar por tipo de venta. Puedes usar `?venta=true` para mostrar solo los anuncios en venta y `?venta=false` para mostrar solo los anuncios en búsqueda.
  - `precio`: Filtrar por precio. Puedes usar `?precio=10-50` para mostrar los anuncios con precio entre 10 y 50, `?precio=10-` para mostrar los anuncios con precio mayor que 10, `?precio=-50` para mostrar los anuncios con precio menor que 50, y `?precio=50` para mostrar los anuncios con precio igual a 50.
  - `nombre`: Filtrar por nombre. Puedes usar `?nombre=coche` para mostrar los anuncios cuyo nombre empiece por "coche".

#### Respuesta

- Código de estado 200: Indica que se han devuelto los anuncios correctamente.
- Código de estado 500: Indica un error interno del servidor si no se pueden obtener los anuncios.

### Obtener los tags existentes

Endpoint: `GET /apiv1/anuncios/tags`

Descripción: Este endpoint devuelve los tags existentes en la base de datos.

#### Respuesta

- Código de estado 200: Indica que se han devuelto los tags correctamente.
- Código de estado 500: Indica un error interno del servidor si no se pueden obtener los tags.


## Web principal

La web principal de NodePop muestra la lista de anuncios con sus detalles, incluyendo nombre, precio, estado de venta, imagen y etiquetas asociadas. Los usuarios pueden aplicar los mismos métodos de filtrado que en el API para refinar la lista de anuncios según sus preferencias.

Puedes acceder a ella haciendo clic en el siguiente enlace: [NodePop](http://localhost:3000/)

Para utilizar filtros específicos, puedes agregar parámetros a la URL. Por ejemplo, puedes usar los siguientes enlaces para filtrar los anuncios:

- Filtrar por nombre: [NodePop - Filtrar por nombre](http://localhost:3000/?nombre=iph)
- Filtrar por precio: [NodePop - Filtrar por precio](http://localhost:3000/?precio=10-50)
- Filtrar por etiqueta: [NodePop - Filtrar por etiqueta](http://localhost:3000/?tag=lifestyle)
- Filtrar por tipo de venta: [NodePop - Filtrar por tipo de venta](http://localhost:3000/?venta=true)

Recuerda que puedes combinar varios filtros para refinar aún más los resultados.

## Contribuciones

Este proyecto es parte de un laboratorio académico y no acepta contribuciones externas en este momento.

Autor: Jorge Quintero Bermejo

