"use client";

import { Pelicula } from "../../types/pelicula";
import { deletePelicula, toggleEstado } from "../../redux/slices/peliculasSlice";
import { useAppDispatch } from "../../redux/hooks";

interface PeliculaFilaProps {
  pelicula: Pelicula;
  onEdit: (pelicula: Pelicula) => void;
}

export default function PeliculaFila({
  pelicula,
  onEdit,
}: PeliculaFilaProps) {
  const dispatch = useAppDispatch();

  return (
    <tr className="pelicula-fila">

      <td>
        {pelicula.imagen ? (
          <img
            src={pelicula.imagen}
            alt={pelicula.nombre}
            className="poster-thumb"
          />
        ) : (
          <div className="poster-placeholder">
            🎬
          </div>
        )}
      </td>

      <td>{pelicula.codigo}</td>

      <td>{pelicula.nombre}</td>

      <td>{pelicula.genero}</td>

      <td>{pelicula.duracion} min</td>

      <td>{pelicula.clasificacion}</td>

      <td>{pelicula.funciones?.join(", ") ?? ""}</td>

      <td>${pelicula.precio.toFixed(2)}</td>

      <td>
        <span
          className={
            pelicula.estado === "Disponible"
              ? "estado-badge disponible"
              : "estado-badge no-disponible"
          }
          onClick={() =>
            dispatch(toggleEstado(pelicula.id))
          }
        >
          {pelicula.estado}
        </span>
      </td>

      <td className="acciones">
        <button
          className="btn-editar"
          onClick={() => onEdit(pelicula)}
        >
          ✏️
        </button>

        <button className="btn-eliminar"
        onClick={() => {
              const confirmar = window.confirm(
                `¿Seguro que deseas eliminar "${pelicula.nombre}"? Esta acción no se puede deshacer.`
                );
                
                if (confirmar) {
                  dispatch(deletePelicula(pelicula.id));
                }
  }}
>
  🗑️
</button>
      </td>

    </tr>
  );
} 