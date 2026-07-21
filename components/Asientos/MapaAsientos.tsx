"use client";
import "@/styles/asientos.css";
import { useState, useEffect } from "react";
import { salas } from "@/data/salas";
import { Salas } from "@/types/sala";
import { Asiento } from "@/types/asientos";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { funciones as funcionesData } from "@/data/funciones";
import { agregarReserva } from "@/redux/slices/reservasSlice";
import { guardarAsientosFuncion, setFunciones } from "@/redux/slices/funcionesSlice";

interface MapaAsientosProps {
  peliculaId?: string | null;
}

export default function MapaAsientos({ peliculaId }: MapaAsientosProps) {
  const dispatch = useAppDispatch();
  const funcionesRedux = useAppSelector((state) => state.funciones);
  const peliculas = useAppSelector((state) => state.peliculas);
  const reservas = useAppSelector((state) => state.reservas.lista ?? []);

  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  
  const [funcionIdSeleccionada, setFuncionIdSeleccionada] = useState<string | null>(null);
  const [salaId, setSalaId] = useState<string>(salas[0]?.id ?? "");
  const [asientos, setAsientos] = useState<Asiento[]>([]);

  // 1. Inicializar funciones en Redux si no existen
  useEffect(() => {
    if (!funcionesRedux || funcionesRedux.length === 0) {
      dispatch(setFunciones(funcionesData));
    }
  }, [dispatch, funcionesRedux]);

  const pelicula = peliculas.find((p) => p.id === Number(peliculaId));
  const sala: Salas | undefined = salas.find((s) => s.id === salaId);
  const funcionActual = funcionesRedux.find((f) => f.id === funcionIdSeleccionada);

  // 2. Sincronización y generación de asientos
  useEffect(() => {
    if (!sala || !funcionIdSeleccionada) return;

    // Si la función en Redux YA tiene asientos guardados (libres u ocupados), los cargamos
    if (funcionActual && funcionActual.asientos && funcionActual.asientos.length > 0) {
      setAsientos(funcionActual.asientos);
      return;
    }

    // Si es la PRIMERA VEZ que se abre esta función, generamos los asientos libres
    const filas = Array.from({ length: sala.filas }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    const asientosIniciales: Asiento[] = filas.flatMap((fila) =>
      Array.from({ length: sala.columnas }).map((_, j) => ({
        id: `${fila}${j + 1}`,
        fila,
        numero: j + 1,
        estado: "libre" as const,
      }))
    );

    // Guardamos la matriz recién generada tanto en el estado local como en Redux
    setAsientos(asientosIniciales);
    dispatch(
      guardarAsientosFuncion({
        funcionId: funcionIdSeleccionada,
        asientos: asientosIniciales,
      })
    );
  }, [funcionIdSeleccionada, sala]);

  if (!sala) return <p className="text-center p-4">Sala no encontrada</p>;

  const filas = Array.from({ length: sala.filas }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const toggleSeleccion = (id: string) => {
    setAsientos((prev) =>
      prev.map((a) => {
        if (a.id !== id || a.estado === "ocupado") return a;
        return {
          ...a,
          estado: a.estado === "libre" ? "seleccionado" : "libre",
        };
      })
    );
  };

  const confirmarReserva = () => {
    // Validar función seleccionada
    if (!funcionActual || !funcionIdSeleccionada) {
      alert("Por favor selecciona un horario para la función.");
      return;
    }

    // Validar asientos seleccionados
    const seleccionados = asientos.filter((a) => a.estado === "seleccionado");
    if (seleccionados.length === 0) {
      alert("Debes seleccionar al menos un asiento.");
      return;
    }

    // Validar datos del cliente
    if (clienteNombre.trim() === "") {
      alert("El nombre no puede estar vacío.");
      return;
    }

    if (clienteNombre.trim().length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (clienteEmail.trim() === "") {
      alert("El email no puede estar vacío.");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(clienteEmail)) {
      alert("Por favor ingresa un email válido.");
      return;
    }

    if (clienteTelefono.trim() === "") {
      alert("El teléfono no puede estar vacío.");
      return;
    }

    const regexTelefono = /^\d{8,15}$/;
    if (!regexTelefono.test(clienteTelefono.replace(/[\s\-()]/g, ""))) {
      alert("El teléfono debe tener entre 8 y 15 dígitos.");
      return;
    }

    // Si pasó todas las validaciones, proceder
    const asientosActualizados: Asiento[] = asientos.map((a) =>
      a.estado === "seleccionado" ? { ...a, estado: "ocupado" as const } : a
    );

    const nuevaReserva = {
      id: `r${reservas.length + 1}`,
      nombre: clienteNombre,
      email: clienteEmail,
      pelicula: pelicula?.nombre ?? "",
      hora: funcionActual.hora,
      boletos: seleccionados.length,
      monto: seleccionados.length * (pelicula?.precio ?? 0),
      sala: sala?.nombre ?? "",
    };

    dispatch(agregarReserva(nuevaReserva));

    dispatch(
      guardarAsientosFuncion({
        funcionId: funcionIdSeleccionada,
        asientos: asientosActualizados,
      })
    );

    setAsientos(asientosActualizados);

    // Limpiar formulario
    setClienteNombre("");
    setClienteEmail("");
    setClienteTelefono("");
    alert("¡Reserva confirmada con éxito!");
  };

  const totalLibres = asientos.filter((a) => a.estado === "libre").length;
  const totalOcupados = asientos.filter((a) => a.estado === "ocupado").length;

  const funcionesPelicula = funcionesRedux.filter((f) =>
    pelicula?.funciones?.includes(f.id)
  );

  return (
    <div className="container-fluid text-light p-4 salas-container">
      {peliculaId && (
        <p className="text-center mb-3">
          <strong className="nombre-pelicula-reserva">{pelicula?.nombre}</strong>
        </p>
      )}

      {/* Selector de funciones */}
      <div className="selector-salas mb-3 text-center">
        {funcionesPelicula.map((f) => {
          const salaFuncion = salas.find((s) => s.id === f.salaId);
          return (
            <button
              key={f.id}
              className={`btn me-2 sala-btn ${
                funcionIdSeleccionada === f.id ? "active" : ""
              }`}
              onClick={() => {
                setSalaId(f.salaId);
                setFuncionIdSeleccionada(f.id);
              }}
            >
              {salaFuncion?.nombre} - {f.hora}
            </button>
          );
        })}
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
                gridTemplateRows: `repeat(${sala.filas}, 40px)`,
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

          {/* Leyenda */}
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
            <p>{totalLibres} Asientos disponibles</p>
            <p>{totalOcupados} Asientos ocupados</p>
          </div>
          <div className="card text-light p-3 w-100">
            <h5 className="mb-3">Resumen de selección</h5>
            <p>
              Asientos seleccionados:{" "}
              <strong>
                {asientos.filter((a) => a.estado === "seleccionado").length}
              </strong>
            </p>
            <p>Precio por boleto: <strong>${pelicula?.precio ?? 0}</strong></p>
            <p>
              Total a pagar:{" "}
              <strong>
                ${asientos.filter((a) => a.estado === "seleccionado").length * (pelicula?.precio ?? 0)}
              </strong>
            </p>
            <hr />
            <div className="mx-1 mb-3">
              <p>Ingresar Datos de cliente</p>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Correo electrónico"
                value={clienteEmail}
                onChange={(e) => setClienteEmail(e.target.value)}
              />
              <input
                type="tel"
                className="form-control mb-2"
                placeholder="Teléfono"
                value={clienteTelefono}
                onChange={(e) => setClienteTelefono(e.target.value)}
              />
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