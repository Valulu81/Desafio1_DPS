"use client";

import Link from "next/link";
import { useAppSelector } from "../../redux/hooks";
import "@/styles/dashboard.css";
import { useState } from "react";
import { Pelicula } from "@/types/pelicula";
import { funciones } from "@/data/funciones";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  //Para redirigir hacia asientos y que guarde el estado:
  const router = useRouter();

  //  pal modal
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);
  const abrirModal = (pelicula: Pelicula) => {
    setPeliculaSeleccionada(pelicula);
  };
  const cerrarModal = () => {
    setPeliculaSeleccionada(null);
  };



  const peliculas = useAppSelector(
    (state) => state.peliculas
  );

  const totalPeliculas = peliculas.length;

  // Pendiente: depende de salasSlice (funciones por sala)
  const totalFunciones = 0;

  // Pendiente: depende de reservasSlice
  const totalBoletosVendidos = 0;

  // Pendiente: depende de salasSlice (asientos por sala)
  const totalAsientosDisponibles = 0;

  // Pendiente: depende de salasSlice (asientos por sala)
  const totalAsientosOcupados = 0;

  // Pendiente: depende de reservasSlice
  const ingresosGenerados = 0;

  // Pendiente: depende de reservasSlice (conteo de reservas por película)
  const peliculaMasReservada = "—";

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>

        <p>
          Resumen general del sistema de cine.
        </p>
      </div>

      <div className="nueva-venta-container">
        <Link href="/ventas" className="btn-nueva-venta">
          + Nueva Venta
        </Link>
      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <span>🎬</span>
          <h3>Total películas</h3>
          <p>{totalPeliculas}</p>
        </div>

        <div className="stat-card">
          <span>🕒</span>
          <h3>Total funciones</h3>
          <p>{totalFunciones}</p>
        </div>

        <div className="stat-card">
          <span>🎟️</span>
          <h3>Boletos vendidos hoy</h3>
          <p>{totalBoletosVendidos}</p>
        </div>

        <div className="stat-card">
          <span>🟢</span>
          <h3>Asientos disponibles</h3>
          <p>{totalAsientosDisponibles}</p>
        </div>

        <div className="stat-card">
          <span>🔴</span>
          <h3>Asientos ocupados</h3>
          <p>{totalAsientosOcupados}</p>
        </div>

        <div className="stat-card">
          <span>💰</span>
          <h3>Ingresos generados hoy</h3>
          <p>${ingresosGenerados}</p>
        </div>

        <div className="stat-card">
          <span>⭐</span>
          <h3>Más reservada hoy</h3>
          <p>{peliculaMasReservada}</p>
        </div>

      </div>

      <div className="lista-peliculas-section">
        <h2>🎬 Catálogo de Películas</h2>

        {peliculas.length === 0 ? (
          <p className="lista-vacia">
            No hay películas registradas.
          </p>
        ) : (
          <div className="lista-peliculas">
            {peliculas.map((pelicula) => (
              <div
                key={pelicula.id}
                className="lista-pelicula-item"
              >
                {pelicula.imagen ? (
                  <img
                    src={pelicula.imagen}
                    alt={pelicula.nombre}
                    className="lista-poster"
                  />
                ) : (
                  <div className="lista-poster-placeholder">
                    🎬
                  </div>
                )}

                <div className="lista-info">
                  <h4>{pelicula.nombre}</h4>
                  <p>{pelicula.genero} · {pelicula.duracion} min</p>

                </div>

                <span
                  className={
                    pelicula.estado === "Disponible"
                      ? "estado-badge disponible"
                      : "estado-badge no-disponible"
                  }
                >
                  {pelicula.estado}
                </span>
                <button className="btn button btn-warning btn-rounded" onClick={() => abrirModal(pelicula)}>Ver funciones</button>

              </div>
            ))}
          </div>
        )}
      </div>
      {/* AQUI TA EL MODAL DE DETALLES */}
      {peliculaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>✖</button>

            {/* Encabezado */}
            <h2>{peliculaSeleccionada.nombre}</h2>
            <div className="modal-info-fila">
                <div className="modal-datos">
                  <p><strong>Género:</strong> {peliculaSeleccionada.genero}</p>
                    <p><strong>Duración:</strong> {peliculaSeleccionada.duracion} min</p>
                    <p><strong>Clasificación:</strong> {peliculaSeleccionada.clasificacion}</p>
                    <p><strong>Precio:</strong> ${peliculaSeleccionada.precio}</p>
                    <p><strong>Descripción:</strong> {peliculaSeleccionada.descripcion}</p>
                </div>
                {peliculaSeleccionada.imagen ? (
                  <img
                  src={peliculaSeleccionada.imagen}
                  alt={peliculaSeleccionada.nombre}
                  className="modal-poster"
                  />
                ) : (<div className="modal-poster-placeholder">🎬
                      </div>)
                }
            </div>

            {/* Tabla de funciones */}
            <table className="tabla-funciones">
              <thead>
                <tr>
                  <th>Funcion</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {peliculaSeleccionada.funciones?.map((fid) => {
                  // Buscar la función completa en el arreglo global "funciones"
                  const funcion = funciones.find((f) => f.id === fid);
                  if (!funcion) {
                    return null;
                  }
                  return (
                    <tr key={funcion.id}>
                      <td>{funcion.id}</td>
                      <td>{funcion.hora}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Botón principal de envío con el id*/}
            <button
            className="btn-principal"
            onClick={() => router.push(`/asientos?peliculaId=${peliculaSeleccionada.id}`)
            }>Reservar Asiento</button>

          </div>
        </div>
      )}

    </div>
  );
}