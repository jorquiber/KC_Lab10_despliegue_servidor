# NodePop

Este proyecto consiste en la mejora de una aplicación Node.js llamada NodePop realizada para el laboratorio del módulo 'Desarrollo Backend con Node.js' del bootcamp 'Desarrollo Web Full Stack' de 'KeepCoding Tech School'. Esta mejora es para el laboratorio del módulo 'Desarrollo Backend Avanzado con Node.js'.

NodePop es una aplicación que proporciona una plataforma para publicar y buscar anuncios. Utiliza Node.js en el backend para gestionar las solicitudes de los usuarios y proporcionar respuestas dinámicas a través de un API RESTful. La aplicación incluye características como la creación de anuncios, la búsqueda de anuncios por diversos criterios y la visualización de los anuncios en una interfaz de usuario amigable.

## Descarga del repositorio

Puedes clonar el repositorio utilizando el siguiente comando de git:

```bash
git clone git@github.com:jorquiber/KC_Lab8_desarrollo_backend_avanzado_nodejs.git
```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la terminal desde la raíz del proyecto:

```bash
npm install
```

## Inicialización de la base de datos

Antes de ejecutar la aplicación, necesitas inicializar la base de datos. EL sigueinte comando iniciará los anuncios y usuarios iniciales. Ten en cuenta que el siguiente comando borrará todo el contenido de la base de datos actual:

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

### Generar token de usuario

Endpoint: `POST /apiv1/authenticate`

Descripción: Este endpoint genera un token JWT de un usuario existente, que estará activo durante 30 minutos.

#### Parámetros de entrada

- Cuerpo de la solicitud: Debe contener los datos del usuario registrado `email` y `password`.

#### Respuesta

- Código de estado 200: Indica que el token JWT se ha creado correctamente.
- Código de estado 500: Indica un error interno del servidor si no se puede crear el token.

### Crear un anuncio

Endpoint: `POST /apiv1/anuncios`

Descripción: Este endpoint crea un nuevo anuncio con los datos proporcionados en el cuerpo de la solicitud. Se requiere autenticación mediante un token JWT para crear un anuncio.

Este endpoint permite que el cliente del API suba una imagen mediante form-data y esta sea guardada en el servidor, de tal forma que cuando hagamos las peticiones `GET /apiv1/anuncios` nos sean devueltas las rutas a estas imágenes y dichas rutas funcionen.

#### Parámetros de entrada

- Cuerpo de la solicitud: Debe contener los datos del anuncio a crear, incluyendo `nombre`, `venta`, `precio`, `foto` (opcional) y `tags`.
- Autenticación: Se puede proporcionar el token JWT de dos formas:
  - Por query-string: Agregando el token JWT como parámetro `jwt` en la URL. Por ejemplo: `POST /apiv1/anuncios?jwt=<token>`
  - Por header: Agregando el token JWT en el encabezado `Authorization`.

#### Respuesta

- Código de estado 200: Indica que el anuncio se ha creado correctamente.
- Código de estado 401: Indica que no se ha proporcionado un token de autenticación válido.
- Código de estado 500: Indica un error interno del servidor si no se puede crear el anuncio.

### Obtener la lista de anuncios

Endpoint: `GET /apiv1/anuncios`

Descripción: Este endpoint devuelve la lista de anuncios según los filtros especificados en los parámetros de la consulta. Se requiere autenticación mediante un token JWT para consultar los anuncios.

#### Parámetros de entrada

- Query string: Puedes especificar los siguientes filtros:
  - `tag`: Filtrar por etiqueta. Por ejemplo, `?tag=work` para mostrar solo los anuncios con la etiqueta "work".
  - `venta`: Filtrar por tipo de venta. Puedes usar `?venta=true` para mostrar solo los anuncios en venta y `?venta=false` para mostrar solo los anuncios en búsqueda.
  - `precio`: Filtrar por precio. Puedes usar `?precio=10-50` para mostrar los anuncios con precio entre 10 y 50, `?precio=10-` para mostrar los anuncios con precio mayor que 10, `?precio=-50` para mostrar los anuncios con precio menor que 50, y `?precio=50` para mostrar los anuncios con precio igual a 50.
  - `nombre`: Filtrar por nombre. Puedes usar `?nombre=coche` para mostrar los anuncios cuyo nombre empiece por "coche".
- Autenticación: Se puede proporcionar el token JWT de dos formas:
  - Por query-string: Agregando el token JWT como parámetro `jwt` en la URL. Por ejemplo: `POST /apiv1/anuncios?jwt=<token>`
  - Por header: Agregando el token JWT en el encabezado `Authorization`.

#### Respuesta

- Código de estado 200: Indica que se han devuelto los anuncios correctamente.
- Código de estado 401: Indica que no se ha proporcionado un token de autenticación válido.
- Código de estado 500: Indica un error interno del servidor si no se pueden obtener los anuncios.

### Obtener los tags existentes

Endpoint: `GET /apiv1/anuncios/tags`

Descripción: Este endpoint devuelve los tags existentes en la base de datos. Se requiere autenticación mediante un token JWT para consultar los tags existentes.

#### Parámetros de entrada

- Autenticación: Se puede proporcionar el token JWT de dos formas:
  - Por query-string: Agregando el token JWT como parámetro `jwt` en la URL. Por ejemplo: `POST /apiv1/anuncios?jwt=<token>`
  - Por header: Agregando el token JWT en el encabezado `Authorization`.

#### Respuesta

- Código de estado 200: Indica que se han devuelto los tags correctamente.
- Código de estado 401: Indica que no se ha proporcionado un token de autenticación válido.
- Código de estado 500: Indica un error interno del servidor si no se pueden obtener los tags.

## Web principal

La web principal de NodePop muestra la lista de anuncios con sus detalles, incluyendo nombre, precio, estado de venta, imagen y etiquetas asociadas. Los usuarios pueden aplicar los mismos métodos de filtrado que en el API para refinar la lista de anuncios según sus preferencias.

Esta web se ha internacionalizado, pudiendo elegir entre los idiomas inglés (en) y espanol (es).

Puedes acceder a ella haciendo clic en el siguiente enlace: [NodePop](http://localhost:3000/)

Para utilizar filtros específicos, puedes agregar parámetros a la URL. Por ejemplo, puedes usar los siguientes enlaces para filtrar los anuncios:

- Filtrar por nombre: [NodePop - Filtrar por nombre](http://localhost:3000/?nombre=iph)
- Filtrar por precio: [NodePop - Filtrar por precio](http://localhost:3000/?precio=10-50)
- Filtrar por etiqueta: [NodePop - Filtrar por etiqueta](http://localhost:3000/?tag=lifestyle)
- Filtrar por tipo de venta: [NodePop - Filtrar por tipo de venta](http://localhost:3000/?venta=true)

Recuerda que puedes combinar varios filtros para refinar aún más los resultados.

## Subida de Imagen con Tarea en Background

### Proceso de Generación de Thumbnails

Al realizar una llamada al endpoint `POST /api/anuncios` con un fichero de imagen como parámetro, se activa un proceso en background para generar un thumbnail de la imagen con un tamaño de 100x100 píxeles. Este proceso se lleva a cabo mediante un microservicio que utiliza una cola de RabbitMQ para gestionar las tareas.

### Flujo del Proceso

1. **Recepción de la Solicitud**:

   - La aplicación `nodepop` recibe la solicitud en el endpoint `POST /api/anuncios`.
   - El fichero de imagen es enviado como parte de la solicitud.

2. **Envío del Mensaje a la Cola**:

   - `nodepop` escribe un mensaje en la cola de RabbitMQ utilizando la URL proporcionada en `AMQP_URL`.
   - Este mensaje contiene la información necesaria para procesar la imagen y generar el thumbnail.

3. **Procesamiento del Mensaje**:
   - El microservicio `queue-consumer` está configurado para escuchar y consumir mensajes de la cola de RabbitMQ.
   - Al recibir un mensaje, `queue-consumer` utiliza la librería `jimp` para procesar la imagen y generar el thumbnail de 100x100 píxeles.

### Ejecución del Microservicio

Para iniciar el microservicio `queue-consumer` que se encarga de la generación del thumbnail, se debe ejecutar el siguiente comando dentro de la carpeta `queue-consumer`:

```bash
node consumer
```

Este flujo asegura que el procesamiento de las imágenes se realiza de manera asíncrona, permitiendo a la aplicación principal manejar otras solicitudes sin esperar a que se complete la generación de los thumbnails.

## Contribuciones

Este proyecto es parte de un laboratorio académico y no acepta contribuciones externas en este momento.

Autor: Jorge Quintero Bermejo
