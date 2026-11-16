import { useEffect, useState } from 'react'
import PuntoForm from './components/PuntoForm'
import PuntoCard from './components/PuntoCard'
import { obtenerPuntos, crearPunto } from './api/puntosApi'
import './App.css'

function App() {
  const [puntos, setPuntos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarPuntos() {
      try {
        const datos = await obtenerPuntos()
        setPuntos(datos)
      } catch (err) {
        setError(err.message || 'No se pudo conectar con la API.')
      } finally {
        setCargando(false)
      }
    }
    cargarPuntos()
  }, [])

  async function agregarPunto(datos) {
    const nuevoPunto = await crearPunto(datos)
    // Se agrega al estado local: la creación aparece sin recargar la página.
    setPuntos((anteriores) => [...anteriores, nuevoPunto])
  }

  function reintentar() {
    setCargando(true)
    setError('')
    obtenerPuntos()
      .then(setPuntos)
      .catch((err) => setError(err.message || 'No se pudo conectar con la API.'))
      .finally(() => setCargando(false))
  }

  const capacidadTotal = puntos.reduce((total, punto) => total + (punto.capacidad || 0), 0)

  return (
    <div className="aplicacion">
      <header className="encabezado">
        <div className="encabezado__contenido">
          <div>
            <p className="encabezado__etiqueta">Red urbana de reciclaje</p>
            <h1>Puntos de Reciclaje</h1>
            <p className="encabezado__texto">
              Registre y consulte los puntos disponibles en la ciudad.
            </p>
          </div>
          <div className="encabezado__stats">
            <div className="stat">
              <span className="stat__valor">{puntos.length}</span>
              <span className="stat__texto">Puntos</span>
            </div>
            <div className="stat">
              <span className="stat__valor">{capacidadTotal}</span>
              <span className="stat__texto">Capacidad total</span>
            </div>
          </div>
        </div>
      </header>

      <main className="contenido">
        <aside>
          <PuntoForm onCrear={agregarPunto} />
        </aside>

        <section className="listado" aria-labelledby="titulo-listado">
          <div className="listado__cabecera">
            <h2 id="titulo-listado">Puntos registrados</h2>
            <button type="button" className="boton boton--secundario" onClick={reintentar}>
              Actualizar
            </button>
          </div>

          {cargando && <p className="estado">Cargando puntos…</p>}

          {error && (
            <div className="alerta alerta--error" role="alert">
              {error}
              <button type="button" className="boton boton--secundario" onClick={reintentar}>
                Reintentar
              </button>
            </div>
          )}

          {!cargando && !error && puntos.length === 0 && (
            <p className="estado">Aún no hay puntos registrados. Agregue el primero con el formulario.</p>
          )}

          <div className="grilla">
            {puntos.map((punto) => (
              <PuntoCard key={punto.id} punto={punto} />
            ))}
          </div>
        </section>
      </main>

      <footer className="pie">
        <p>Examen práctico · Spring Boot + React + PostgreSQL</p>
      </footer>
    </div>
  )
}

export default App
