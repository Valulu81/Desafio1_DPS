"use client";

import { useState } from "react";
import { Pelicula } from "../../types/pelicula";
import { addPelicula, editPelicula } from "../../redux/slices/peliculasSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { funciones } from "@/data/funciones";
import { salas } from "@/data/salas";
import "../../styles/modal.css";


interface FormularioPeliculaProps {
  peliculaEditar: Pelicula | null;
  onClose: () => void;
}

export default function FormularioPelicula({
  peliculaEditar,
  onClose,
}: FormularioPeliculaProps) {
  const dispatch = useAppDispatch();

  const peliculas = useAppSelector(
    (state) => state.peliculas
  );

  const [codigo, setCodigo] = useState(
    peliculaEditar?.codigo ?? ""
  );

  const [nombre, setNombre] = useState(
    peliculaEditar?.nombre ?? ""
  );

  const [genero, setGenero] = useState(
    peliculaEditar?.genero ?? ""
  );

  const [duracion, setDuracion] = useState<number | "">(
    peliculaEditar?.duracion ?? ""
  );

  const [clasificacion, setClasificacion] = useState(
    peliculaEditar?.clasificacion ?? ""
  );

  const [precio, setPrecio] = useState(
    peliculaEditar?.precio ?? 0
  );

  const [imagen, setImagen] = useState(
    peliculaEditar?.imagen ?? ""
  );

  const [descripcion, setDescripcion] = useState(
    peliculaEditar?.descripcion ?? ""
  );

  const salaInicial = (() => {
    const primeraFuncionId = peliculaEditar?.funciones?.[0];
    const funcion = funciones.find((f) => f.id === primeraFuncionId);
    return funcion?.salaId ?? "";
  })();

  const [salaSeleccionada, setSalaSeleccionada] = useState(salaInicial);

  const [error, setError] = useState("");

  const handleGuardar = () => {
    if (nombre.trim() === "") {
      setError("El nombre no puede estar vacío.");
      return;
    }

    if (codigo.trim() === "") {
      setError("El código no puede estar vacío.");
      return;
    }

    if (genero.trim() === "") {
      setError("El género no puede estar vacío.");
      return;
    }

    if (clasificacion.trim() === "") {
      setError("La clasificación no puede estar vacía.");
      return;
    }

    if (duracion === "" || duracion <= 0) {
      setError("La duración debe ser mayor a 0.");
      return;
    }

    if (precio < 0) {
      setError("El precio no puede ser negativo.");
      return;
    }

    const codigoRepetido = peliculas.some(
      (p) =>
        p.codigo === codigo &&
        p.id !== peliculaEditar?.id
    );

    if (codigoRepetido) {
      setError("Ya existe una película con ese código.");
      return;
    }

    setError("");

    const funcionesDeLaSala = funciones
      .filter((f) => f.salaId === salaSeleccionada)
      .map((f) => f.id);

    const datos = {
      codigo,
      nombre,
      genero,
      duracion,
      clasificacion,
      precio,
      estado: peliculaEditar?.estado ?? "Disponible" as const,
      imagen,
      descripcion,
      funciones: funcionesDeLaSala,
    };

    if (peliculaEditar) {
      dispatch(
        editPelicula({ id: peliculaEditar.id, ...datos })
      );
    } else {
      dispatch(addPelicula(datos));
    }

    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <div className="modal-header">
          <h2>
            {peliculaEditar
              ? "Editar Película"
              : "Agregar Película"}
          </h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="modal-error">{error}</p>
        )}

        <div className="modal-form">

          <label>Código</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Género</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />

          <label>Duración (min)</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) =>
              setDuracion(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />

          <label>Clasificación</label>
          <input
            type="text"
            value={clasificacion}
            onChange={(e) =>
              setClasificacion(e.target.value)
            }
          />

          <label>Sala</label>
          <select
            value={salaSeleccionada}
            onChange={(e) => setSalaSeleccionada(e.target.value)}
          >
            <option value="">Seleccionar sala</option>

            {salas.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nombre}
              </option>
            ))}
          </select>

          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) =>
              setPrecio(Number(e.target.value))
            }
          />

          <label>Imagen (URL)</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />

          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
          />

        </div>

        <button
          className="modal-guardar"
          onClick={handleGuardar}
        >
          Guardar
        </button>

      </div>

    </div>
  );
}