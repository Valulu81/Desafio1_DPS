"use client";

import { useState } from "react";
import TablaPeliculas from "@/components/Peliculas/GestionPeliculas";
import FormularioPelicula from "@/components/Peliculas/FormularioPelicula";
import { Pelicula } from "@/types/pelicula";

export default function PeliculasPage() {

  const [modalAbierto, setModalAbierto] = useState(false);

  const [peliculaEditar, setPeliculaEditar] =
    useState<Pelicula | null>(null);

  const abrirAgregar = () => {
    setPeliculaEditar(null);
    setModalAbierto(true);
  };

  const abrirEditar = (pelicula: Pelicula) => {
    setPeliculaEditar(pelicula);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPeliculaEditar(null);
  };

  return (
    <main className="peliculas-page">

      <div className="peliculas-header">
        <div>
          <h1>🎬 Gestión de Películas</h1>
          <p>Administra el catálogo de películas del cine.</p>
        </div>

        <button
          className="btn-agregar"
          onClick={abrirAgregar}
        >
          + Agregar
        </button>
      </div>

      <TablaPeliculas onEdit={abrirEditar} />

      {modalAbierto && (
        <FormularioPelicula
          peliculaEditar={peliculaEditar}
          onClose={cerrarModal}
        />
      )}

    </main>
  );
}