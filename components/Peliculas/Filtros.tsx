"use client";

interface FiltrosProps {
  generoSeleccionado: string;
  setGeneroSeleccionado: (value: string) => void;
  generosDisponibles: string[];

  clasificacionSeleccionada: string;
  setClasificacionSeleccionada: (value: string) => void;
  clasificacionesDisponibles: string[];

  salaSeleccionada: string;
  setSalaSeleccionada: (value: string) => void;
  salasDisponibles: string[];
}

export default function Filtros({
  generoSeleccionado,
  setGeneroSeleccionado,
  generosDisponibles,
  clasificacionSeleccionada,
  setClasificacionSeleccionada,
  clasificacionesDisponibles,
  salaSeleccionada,
  setSalaSeleccionada,
  salasDisponibles,
}: FiltrosProps) {
  return (
    <>
      <select
        className="filtro-select"
        value={generoSeleccionado}
        onChange={(e) =>
          setGeneroSeleccionado(e.target.value)
        }
      >
        <option value="">Todos los géneros</option>

        {generosDisponibles.map((genero) => (
          <option key={genero} value={genero}>
            {genero}
          </option>
        ))}
      </select>

      <select
        className="filtro-select"
        value={clasificacionSeleccionada}
        onChange={(e) =>
          setClasificacionSeleccionada(e.target.value)
        }
      >
        <option value="">Todas las clasificaciones</option>

        {clasificacionesDisponibles.map((clasificacion) => (
          <option key={clasificacion} value={clasificacion}>
            {clasificacion}
          </option>
        ))}
      </select>

      <select
        className="filtro-select"
        value={salaSeleccionada}
        onChange={(e) =>
          setSalaSeleccionada(e.target.value)
        }
      >
        <option value="">Todas las salas</option>

        {salasDisponibles.map((sala) => (
          <option key={sala} value={sala}>
            {sala}
          </option>
        ))}
      </select>
    </>
  );
}