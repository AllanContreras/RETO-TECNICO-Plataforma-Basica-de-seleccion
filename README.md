# Plataforma Basica de Seleccion de Practicantes

Proyecto web para registrar practicantes y permitir que analistas revisen su informacion y estado de seleccion.

## Estructura inicial

- `backend/` para la API con Node.js, Express y MongoDB.
- `frontend/` para la interfaz con React.
- `uploads/` para almacenar hojas de vida PDF.

## Fases de trabajo

1. Estructura inicial y control de versiones.
2. Backend base y conexion a MongoDB.
3. Modelo, rutas y controladores.
4. Frontend de registro.
5. Panel de analista.
6. Documentacion y ajuste final.

## Conexion a MongoDB

1. Crea una base de datos local o en Atlas.
2. Copia `backend/.env.example` a `backend/.env`.
3. Ajusta `MONGODB_URI` con tu cadena real de Atlas o local.
4. Ejecuta el backend desde `backend/` con `npm install` y `npm run dev`.

La coleccion que usa el proyecto es `practicantes` y se crea automaticamente cuando registras el primer candidato.
