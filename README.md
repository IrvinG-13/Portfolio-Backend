# Portfolio Backend – REST API

## Descripción

Backend desarrollado con Node.js y Express.js para gestionar la información de mi portafolio web. Proporciona una API REST que permite administrar proyectos, gestionar mensajes de contacto y autenticar al administrador.

La aplicación utiliza PostgreSQL como sistema de gestión de bases de datos y Prisma ORM para interactuar con ella.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express.js:** framework para desarrollar la API REST.
- **PostgreSQL:** sistema de gestión de bases de datos relacionales.
- **Prisma ORM:** gestión de modelos, consultas y migraciones de base de datos.
- **JWT (JSON Web Token):** autenticación y autorización.
- **Bcrypt.js:** hash de contraseñas.
- **Dotenv:** gestión de variables de entorno.
- **CORS:** configuración del acceso desde el frontend.

## Arquitectura del proyecto

El backend está organizado mediante una estructura modular para separar las responsabilidades:

- `src/config/`: configuración y conexión con la base de datos.
- `src/controllers/`: lógica de procesamiento de las solicitudes.
- `src/middleware/`: middleware para autenticación y protección de rutas.
- `src/routes/`: definición de endpoints de la API.
- `src/utils/`: funciones auxiliares.
- `prisma/`: esquema de base de datos y migraciones.

## Modelos de base de datos

Se implementaron tres modelos principales:

- **Usuario:** almacena las credenciales del administrador, su contraseña cifrada y su rol.
- **Proyecto:** almacena el título, descripción, tecnologías, imagen, enlaces al repositorio y demo, y estado destacado.
- **MensajeContacto:** almacena el nombre, correo electrónico, mensaje y estado de lectura de los mensajes recibidos.

## Funcionalidades de la API

### Autenticación
- Inicio de sesión del administrador.
- Validación de credenciales mediante Bcrypt.
- Generación de tokens JWT.
- Protección de endpoints administrativos mediante middleware.

### Gestión de proyectos
- Obtener todos los proyectos.
- Obtener proyectos destacados.
- Crear nuevos proyectos.
- Actualizar proyectos existentes.
- Eliminar proyectos.

### Gestión de mensajes de contacto
- Registrar nuevos mensajes.
- Obtener los mensajes recibidos.
- Marcar mensajes como leídos.
- Eliminar mensajes.

## Base de datos

Se utiliza PostgreSQL junto con Prisma ORM.

Las migraciones de Prisma permiten mantener sincronizada la estructura de la base de datos con los modelos definidos en el proyecto.

## Despliegue

El backend está desplegado en **Render**, conectado a un repositorio de GitHub y utilizando una instancia de PostgreSQL alojada en la misma plataforma.

La configuración de producción utiliza variables de entorno para administrar la conexión a la base de datos y los parámetros de autenticación.

## Objetivo del proyecto

Este backend fue desarrollado como parte de mi aprendizaje en desarrollo de software Full Stack, aplicando conocimientos de Node.js, Express, diseño de API REST, bases de datos relacionales, autenticación, seguridad y despliegue de aplicaciones en la nube.
