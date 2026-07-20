"use client";
import "@/styles/asientos.css";
import { useState, useEffect } from "react";
import { salas } from "@/data/salas";
import { Salas } from "@/types/sala";
import { Asiento } from "@/types/asientos";

export default function MapaAsientos() {
  const [salaId, setSalaId] = useState<number>(salas[0].id);
  const sala: Salas | undefined = salas.find((s) => s.id === salaId);

  if (!sala) return <p>Sala no encontrada</p>;

  const filas = Array.from({ length: sala.filas }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [asientos, setAsientos] = useState<Asiento[]>([]);

  // 🔑 Regenerar asientos cada vez que cambie la sala
  useEffect(() => {
    const nuevosAsientos: Asiento[] = filas.flatMap((fila) =>
      Array.from({ length: sala.columnas }).map((_, j) => ({
        id: `${fila}${j + 1}`,
        fila,
        numero: j + 1,
        estado: "libre",
      }))
    );
    setAsientos(nuevosAsientos);
  }, [salaId]); // se ejecuta cada vez que cambias de sala

  const toggleSeleccion = (id: string) => {
    setAsientos((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
            ...a,
            estado:
              a.estado === "libre"
                ? "seleccionado"
                : a.estado === "seleccionado"
                  ? "libre"
                  : a.estado,
          }
          : a
      )
    );
  };

  const confirmarReserva = () => {
    setAsientos((prev) =>
      prev.map((a) =>
        a.estado === "seleccionado" ? { ...a, estado: "ocupado" } : a
      )
    );
  };

  const totalLibres = asientos.filter((a) => a.estado === "libre").length;
  const totalOcupados = asientos.filter((a) => a.estado === "ocupado").length;

  return (
    <div className="container-fluid text-light p-4 salas-container">
      {/* aqui estan los botones de salas */}
      <div className="selector-salas mb-3 text-center">
        {salas.map((s) => (
          <button
            key={s.id}
            className={`btn me-2 sala-btn ${s.id === salaId ? "active" : ""}`}
            onClick={() => setSalaId(s.id)}
          >
            {s.nombre}
          </button>

        ))}
      </div>

      <div className="row justify-content-center align-items-start">
        {/* Mapa de asientos */}
        <div className="col-md-8 d-flex flex-column align-items-center contyenedor-asientos">
          <h3 className="text-center mb-3">{sala.nombre}</h3>
          <button className="btn btn-primary mb-3" style={{ backgroundColor: "#9810FA" }}>
            Pantalla
          </button>
          <div className="asientos-layout">
            <div
              className="letras-col"
              style={{ gridTemplateRows: `repeat(${sala.filas}, 40px)` }}
            >
              {filas.map((fila) => (
                <div key={fila} className="fila-letra">{fila}</div>
              ))}
            </div>

            <div
              className="asientos-grid"
              style={{
                gridTemplateColumns: `repeat(${sala.columnas}, 40px)`,
                gridTemplateRows: `repeat(${sala.filas}, 40px)`
              }}
            >
              {asientos.map((asiento) => (
                <button
                  key={asiento.id}
                  className={`asiento ${asiento.estado}`}
                  type="button"
                  onClick={() => toggleSeleccion(asiento.id)}
                  disabled={asiento.estado === "ocupado"}
                >
                  {asiento.numero}
                </button>
              ))}
            </div>
          </div>
          {/* Estados de los asientos*/}
          <div className="leyenda-asientos my-4 text-center">
            <div className="d-flex justify-content-center gap-4">
              <div className="d-flex align-items-center">
                <div className="cuadro libre me-2"></div>
                <span>Disponible</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="cuadro seleccionado me-2"></div>
                <span>Seleccionado</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="cuadro ocupado me-2"></div>
                <span>Ocupado</span>
              </div>
            </div>
          </div>

        </div>

        {/* Resumen lateral */}

        <div className="col-lg-3 col-md-5 cartita">
          <div>
            <p>{totalLibres} Asientos disponibles </p>
            <p>{totalOcupados} Asientos ocupados</p>
          </div>
          <div className="card text-light p-3 w-100 ">
            <h5 className="mb-3">Resumen de seleccion</h5>
            <p>Asientos seleccionados: <strong>{asientos.filter((a) => a.estado === "seleccionado").length}</strong></p>
            <p>Precio por boleto: <strong>$100 MXN</strong></p>
            <p>Total a pagar: <strong>${asientos.filter((a) => a.estado === "seleccionado").length * 100} MXN</strong></p>
            <hr></hr>
            <div className="mx-5 mb-3">
              <p>Ingresar Datos de cliente</p>
              <input type="text" className="form-control mb-2 " placeholder="Nombre" />
              <input type="email" className="form-control mb-2" placeholder="Correo electrónico" />
              <input type="tel" className="form-control mb-2" placeholder="Teléfono" />
            </div>
            <button className="btn btn-success w-100" onClick={confirmarReserva}>
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
