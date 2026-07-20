"use client";

import { useAppSelector } from "../../redux/hooks";
import PeliculaFila from "./PeliculaFila";
import { Pelicula } from "../../types/pelicula";
import "../../styles/peliculas.css";

interface TablaPeliculasProps {
  onEdit: (pelicula: Pelicula) => void;
}

export default function TablaPeliculas({
  onEdit,
}: TablaPeliculasProps) {

  const peliculas = useAppSelector(
    (state) => state.peliculas
  );

  return (
    <div className="tabla-container">

      <table className="tabla-peliculas">

        <thead>
          <tr>
            <th>Póster</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Duración</th>
            <th>Clasif.</th>
            <th>Sala</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {peliculas.length === 0 ? (
            <tr>
              <td colSpan={10} className="tabla-vacia">
                No hay películas registradas
              </td>
            </tr>
          ) : (
            peliculas.map((pelicula) => (
              <PeliculaFila
                key={pelicula.id}
                pelicula={pelicula}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}