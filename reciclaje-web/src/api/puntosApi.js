const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/puntos'

async function leerRespuesta(respuesta) {
  if (!respuesta.ok) {
    let detalle = `Error HTTP ${respuesta.status}`
    try {
      const cuerpo = await respuesta.json()
      if (cuerpo?.errores) {
        detalle = Object.values(cuerpo.errores).join(' ')
      } else if (cuerpo?.mensaje) {
        detalle = cuerpo.mensaje
      }
    } catch {
      // La respuesta de error no era JSON; se conserva el mensaje genérico.
    }
    throw new Error(detalle)
  }
  return respuesta.json()
}

/** GET /api/puntos */
export async function obtenerPuntos() {
  const respuesta = await fetch(API_URL)
  return leerRespuesta(respuesta)
}

/** POST /api/puntos */
export async function crearPunto(punto) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(punto),
  })
  return leerRespuesta(respuesta)
}
