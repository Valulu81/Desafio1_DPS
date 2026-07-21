"use client";

import "../../styles/search.css";

interface BuscadorProps {
  busqueda: string;
  setBusqueda: (value: string) => void;
}

export default function Buscador({
  busqueda,
  setBusqueda,
}: BuscadorProps) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Buscar película por nombre..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
      />
    </div>
  );
}