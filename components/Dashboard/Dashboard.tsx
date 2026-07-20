"use client";

import { useAppSelector } from "../../redux/hooks";
import "../../styles/dashboard.css";

export default function Dashboard() {

  const peliculas = useAppSelector(
    (state) => state.peliculas
  );

  const totalPeliculas = peliculas.length;

  const totalDisponibles = peliculas.filter(
    (p) => p.estado === "Disponible"
  ).length;

  // Pendiente: depende de reservasSlice
  const totalBoletosVendidos = 0;

  // Pendiente: depende de reservasSlice
  const ingresosGenerados = 0;

  return (
    <div className="dashboard">
      <p>Dashboard</p>

      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>

        <p>
          Resumen general del sistema de cine.
        </p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <span>🎬</span>
          <h3>Total Películas</h3>
          <p>{totalPeliculas}</p>
        </div>

        <div className="stat-card">
          <span>✅</span>
          <h3>Disponibles</h3>
          <p>{totalDisponibles}</p>
        </div>

        <div className="stat-card">
          <span>🎟️</span>
          <h3>Boletos Vendidos</h3>
          <p>{totalBoletosVendidos}</p>
        </div>

        <div className="stat-card">
          <span>💰</span>
          <h3>Ingresos Generados</h3>
          <p>${ingresosGenerados}</p>
        </div>

      </div>

    </div>
  );
}