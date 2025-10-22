# Gestor de Tareas

Este es un simple gestor de tareas con una interfaz web y un backend construido con Node.js y Express.

## API Endpoints

| Método | Ruta                | Descripción                  |
|--------|---------------------|------------------------------|
| POST   | /api/tareas         | Crea una nueva tarea.        |
| GET    | /api/tareas         | Obtiene todas las tareas.    |
| PUT    | /api/tareas/:id     | Actualiza una tarea.         |
| PUT    | /api/tareas/:id/completar | Marca una tarea como completada.|
| DELETE | /api/tareas/:id     | Elimina una tarea.           |

## Pruebas

El proyecto incluye los siguientes tipos de pruebas:

- **Caja Blanca:** Pruebas que verifican el comportamiento interno de la aplicación, como el manejo de errores de la base de datos.
- **Caja Gris:** Pruebas que verifican el comportamiento de la aplicación con un conocimiento parcial de su estructura interna.
- **Caja Negra:** Pruebas que verifican el comportamiento de la aplicación sin conocimiento de su estructura interna.
- **Flujo:** Pruebas que verifican un flujo completo de la aplicación, como crear, completar y eliminar una tarea.
- **Integración:** Pruebas que verifican la integración de los diferentes componentes de la aplicación.
- **Unitarias:** Pruebas que verifican el funcionamiento de una unidad de código específica.

## Estructura del Proyecto

```
gestorTareas/
├── backend/
│   ├── .gitignore
│   ├── app.js
│   ├── bun.lock
│   ├── db.js
│   ├── jest.config.js
│   ├── package.json
│   ├── tareas.db
│   ├── routes/
│   │   └── tareas.js
│   └── tests/
│       ├── caja_blanca.test.js
│       ├── caja_gris.test.js
│       ├── caja_negra.test.js
│       ├── flujo.test.js
│       ├── integration.test.js
│       └── unit.test.js
└── frontend/
    └── index.html
```
