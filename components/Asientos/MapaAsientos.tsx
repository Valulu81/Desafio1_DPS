"use client";
import { useState } from "react";
import { salas } from "@/data/salas";
import { Salas } from "@/types/sala";
import "@/styles/asientos.css";

export default function MapaAsientos() {
  const [salaId, setSalaId] = useState<number>(salas[0].id);
  const sala: Salas | undefined = salas.find((s) => s.id === salaId);

  if (!sala) return <p>Sala no encontrada</p>;

  const filas = Array.from({ length: sala.filas }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="mapa-asientos">
      <section className="asientos container border border-2 border-dark rounded-3 p-3 bg-dark">
        {/* Botones de selección de sala */}
        <div className="selector-salas mb-3 text-center">
          {salas.map((s) => (
            <button
              key={s.id}
              className={`btn me-2 ${s.id === salaId ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSalaId(s.id)}
            >
              {s.nombre}
            </button>
          ))}
        </div>

        <h3 className="text-light text-center mb-3">{sala.nombre}</h3>

        <div className="asientos-layout">
          <div
            className="letras-col"
            style={{ gridTemplateRows: `repeat(${sala.filas}, 40px)` }}
          >
              {filas.map((fila) => (
                <div key={fila} className="fila-letra btn asiento libre ">
                  {fila}
                </div>
              ))}

          </div>

          <div
            className="asientos-grid"
            style={{
              gridTemplateColumns: `repeat(${sala.columnas}, 40px)`,
              gridTemplateRows: `repeat(${sala.filas}, 40px)`
            }}
          >
            {filas.map((fila) =>
              Array.from({ length: sala.columnas }).map((_, j) => (
                <button key={`${fila}${j + 1}`} className="btn asiento libre">
                  {j + 1}
                </button>
              ))
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
