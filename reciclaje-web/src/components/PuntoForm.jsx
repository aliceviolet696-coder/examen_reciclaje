import { useState } from 'react'

const FORMULARIO_INICIAL = {
  nombre: '',
  sector: '',
  material: '',
  capacidad: '',
}

function PuntoForm({ onCrear }) {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')
    setMensaje('')

    const capacidad = Number(formulario.capacidad)
    if (
      !formulario.nombre.trim() ||
      !formulario.sector.trim() ||
      !formulario.material.trim() ||
      formulario.capacidad === ''
    ) {
      setError('Complete todos los campos del formulario.')
      return
    }
    if (!Number.isInteger(capacidad) || capacidad < 0) {
      setError('La capacidad debe ser un número entero mayor o igual a 0.')
      return
    }

    setEnviando(true)
    try {
      await onCrear({
        nombre: formulario.nombre.trim(),
        sector: formulario.sector.trim(),
        material: formulario.material.trim(),
        capacidad,
      })
      setFormulario(FORMULARIO_INICIAL)
      setMensaje('Punto registrado correctamente.')
    } catch (err) {
      setError(err.message || 'No se pudo registrar el punto.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <h2>Nuevo punto</h2>
      <p className="formulario__ayuda">Registre un punto de reciclaje urbano.</p>

      <label htmlFor="nombre">Nombre del punto *</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Ej. EcoPunto Central"
        value={formulario.nombre}
        onChange={manejarCambio}
        maxLength={100}
        required
      />

      <label htmlFor="sector">Sector o barrio *</label>
      <input
        id="sector"
        name="sector"
        type="text"
        placeholder="Ej. Centro Histórico"
        value={formulario.sector}
        onChange={manejarCambio}
        maxLength={100}
        required
      />

      <label htmlFor="material">Material que recibe *</label>
      <input
        id="material"
        name="material"
        type="text"
        placeholder="Ej. Plástico, vidrio, papel"
        value={formulario.material}
        onChange={manejarCambio}
        maxLength={100}
        required
      />

      <label htmlFor="capacidad">Capacidad disponible (unidades) *</label>
      <input
        id="capacidad"
        name="capacidad"
        type="number"
        min="0"
        step="1"
        placeholder="Ej. 250"
        value={formulario.capacidad}
        onChange={manejarCambio}
        required
      />

      {error && <p className="alerta alerta--error" role="alert">{error}</p>}
      {mensaje && <p className="alerta alerta--ok" role="status">{mensaje}</p>}

      <button type="submit" className="boton" disabled={enviando}>
        {enviando ? 'Guardando…' : 'Registrar punto'}
      </button>
    </form>
  )
}

export default PuntoForm
