# Plataforma Basica de Seleccion de Practicantes

Aplicacion web para registrar practicantes y permitir que un analista revise los candidatos, descargue su hoja de vida y cambie su estado.

## Que hace el sistema

- Los practicantes se registran en la vista publica `/registro`.
- Los analistas revisan candidatos en `/admin`.
- El backend guarda los datos en MongoDB y almacena los PDF en la carpeta `uploads/`.

## Tecnologias

- Frontend: React, CSS, Axios, React Router.
- Backend: Node.js, Express.
- Base de datos: MongoDB con Mongoose.
- Archivos: Multer para subir hojas de vida PDF.

## Estructura del proyecto

- `backend/` contiene la API REST, la conexion a MongoDB y la logica de guardado.
- `frontend/` contiene las dos vistas separadas por ruta.
- `uploads/` guarda las hojas de vida PDF subidas.

## Rutas principales

- `/registro`: formulario publico para candidatos.
- `/admin`: panel para analistas.

## Variables de entorno

En `backend/.env` debes tener al menos:

```env
PORT=5000
MONGODB_URI=tu_cadena_de_mongodb
```

Si usas Atlas, copia `backend/.env.example` y reemplaza la cadena por la tuya.

## Instalacion y ejecucion

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Como probar el sistema

1. Abre `http://localhost:5173/registro`.
2. Registra un practicante con un PDF.
3. Abre `http://localhost:5173/admin`.
4. Verifica que el candidato aparezca en la lista.
5. Descarga la hoja de vida o cambia el estado a `Viable` o `No viable`.

## API REST

- `POST /api/practicantes`: registra un candidato.
- `GET /api/practicantes`: lista todos los candidatos.
- `PUT /api/practicantes/:id/estado`: cambia el estado del candidato.

## Base de datos

La coleccion usada por el proyecto es `practicantes`.
En Atlas, los candidatos quedan guardados en la base configurada en `MONGODB_URI`.

## Nota tecnica

Si tu entorno tiene problemas con `mongodb+srv`, puedes usar la URI estandar con los seeds del cluster. En este proyecto funciono mejor que el SRV en algunos equipos por temas de DNS local.
