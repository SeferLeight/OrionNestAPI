## Description

Crear una API REST en Node.js que gestione Libros y Autores. Se deben crear 2 endpoints para operar con la misma.

Se puede usar almacenamiento en memoria o el sistema gestor de bases de datos de su preferencia.

Entidad Libro (book):
-id: number
-title: string
-chapters: number. Representa la cantidad de capítulos.
-pages: number. Representa la cantidad de páginas.

Entidad Autor (author):
-id: number
-name: string

Debe existir una relación del tipo Many-to-Many entre los libros y los autores

Endpoints:

-Nuevo Libro: Creará un nuevo libro, aportando todos sus datos incluidos los autores. ✅
-Obtener todos los libros: Deberá devolver un listado de libros con sus autores. ✅
-Crear un autor: Creará un nuevo autor ✅
-Obtener todos los autores: Deberá devolver un listado de todos los autores con los libros que tengan. ✅
-Obtener Promedio de Páginas por Capítulo: Obtener el dato de una instancia de Libro ya creada. Se debe devolver el id del libro consultado y un promedio de páginas por capítulo. Ambos en formato cadena, y con 2 decimales para el promedio. ✅

El código debe ser enteramente desarrollado en Typescript.

## Installation

```bash
$ npm install
```

## Add MySQL BD with docker

```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
