# Frontend — Puntos de Reciclaje

Aplicación React (Vite) que consume la API Spring Boot del proyecto.

## Ejecución

```powershell
npm install
npm run dev
```

Abre `http://localhost:5173`. La API debe estar en `http://localhost:8080`.

Para cambiar la URL de la API, copia `.env.example` como `.env` y ajusta `VITE_API_URL`.

## Componentes

- `src/App.jsx`: carga inicial (`useEffect` + GET), estado de puntos y render con `map()`.
- `src/components/PuntoForm.jsx`: formulario controlado y POST con `async/await`.
- `src/components/PuntoCard.jsx`: tarjeta que recibe el punto por props.
- `src/api/puntosApi.js`: funciones `obtenerPuntos()` y `crearPunto()` con `fetch`.
