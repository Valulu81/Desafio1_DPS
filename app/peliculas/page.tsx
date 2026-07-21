"use client";

import { useState } from "react";
import TablaPeliculas from "@/components/Peliculas/TablaPeliculas";
import FormularioPelicula from "@/components/Peliculas/FormularioPelicula";
import Buscador from "@/components/Peliculas/Buscador";
import Filtros from "@/components/Peliculas/Filtros";
import { Pelicula } from "@/types/pelicula";
import { useAppSelector } from "@/redux/hooks";
import { funciones } from "@/data/funciones";
import { salas } from "@/data/salas";

export default function PeliculasPage() {

  const obtenerSalasDePelicula = (funcionesIds?: string[]) => {
  const nombres = (funcionesIds ?? [])
    .map((fid) => {
      const funcion = funciones.find((f) => f.id === fid);
      const sala = salas.find((s) => s.id === funcion?.salaId);
      return sala?.nombre;
    })
    .filter((nombre): nombre is string => Boolean(nombre));

  return Array.from(new Set(nombres));
};
const peliculas = useAppSelector(
    (state) => state.peliculas
  );

const salasDisponibles = Array.from(
  new Set(
    peliculas.flatMap((p) => obtenerSalasDePelicula(p.funciones))
  )
);

  
  const [modalAbierto, setModalAbierto] = useState(false);

  const [peliculaEditar, setPeliculaEditar] =
    useState<Pelicula | null>(null);

  const [busqueda, setBusqueda] = useState("");

  const [generoSeleccionado, setGeneroSeleccionado] =
    useState("");

  const [clasificacionSeleccionada, setClasificacionSeleccionada] =
    useState("");

  const [salaSeleccionada, setSalaSeleccionada] =
    useState("");

  const [soloDisponibles, setSoloDisponibles] =
    useState(false);

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

  const generosDisponibles = Array.from(
    new Set(peliculas.map((p) => p.genero))
  );

  const clasificacionesDisponibles = Array.from(
    new Set(peliculas.map((p) => p.clasificacion))
  );


  const peliculasFiltradas = peliculas.filter((p) => {

    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideGenero =
      generoSeleccionado === "" ||
      p.genero === generoSeleccionado;

    const coincideClasificacion =
      clasificacionSeleccionada === "" ||
      p.clasificacion === clasificacionSeleccionada;



      

    const coincideSala =
      salaSeleccionada === "" ||
        obtenerSalasDePelicula(p.funciones).includes(salaSeleccionada);




    const coincideDisponibilidad =
      !soloDisponibles || p.estado === "Disponible";

    return (
      coincideNombre &&
      coincideGenero &&
      coincideClasificacion &&
      coincideSala &&
      coincideDisponibilidad
    );
  });

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

      <div className="controles-fila">

        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        <Filtros
          generoSeleccionado={generoSeleccionado}
          setGeneroSeleccionado={setGeneroSeleccionado}
          generosDisponibles={generosDisponibles}
          clasificacionSeleccionada={clasificacionSeleccionada}
          setClasificacionSeleccionada={setClasificacionSeleccionada}
          clasificacionesDisponibles={clasificacionesDisponibles}
          salaSeleccionada={salaSeleccionada}
          setSalaSeleccionada={setSalaSeleccionada}
          salasDisponibles={salasDisponibles}
        />

        <label className="checkbox-disponibles">
          <input
            type="checkbox"
            checked={soloDisponibles}
            onChange={(e) =>
              setSoloDisponibles(e.target.checked)
            }
          />
          Mostrar solo disponibles
        </label>

      </div>

      <TablaPeliculas
        peliculas={peliculasFiltradas}
        onEdit={abrirEditar}
      />

      {modalAbierto && (
        <FormularioPelicula
          peliculaEditar={peliculaEditar}
          onClose={cerrarModal}
        />
      )}

    </main>
  );
}