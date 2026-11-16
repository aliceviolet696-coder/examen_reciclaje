function PuntoCard({ punto }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__cabecera">
        <span className="tarjeta__id">#{punto.id}</span>
        <span className="tarjeta__material">{punto.material}</span>
      </div>

      <h3 className="tarjeta__nombre">{punto.nombre}</h3>

      <p className="tarjeta__dato">
        <span aria-hidden="true">📍</span> {punto.sector}
      </p>
      <p className="tarjeta__dato">
        <span aria-hidden="true">♻️</span> {punto.material}
      </p>
      <p className="tarjeta__dato tarjeta__capacidad">
        <span aria-hidden="true">📦</span> Capacidad: <strong>{punto.capacidad}</strong> unidades
      </p>
    </article>
  )
}

export default PuntoCard
