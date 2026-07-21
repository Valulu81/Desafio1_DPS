"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { HistorialVentas } from "@/components/Ventas/HistorialVentas";
import "@/styles/ventas.css";

export default function VentasPage() {
    const reservas = useSelector((state: RootState) => state.reservas.lista);
    const [busqueda, setBusqueda] = useState("");

    const reservasFiltradas = reservas.filter((r) => {
        const coincideNombre = r.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincidePelicula = r.pelicula.toLowerCase().includes(busqueda.toLowerCase());
        return coincideNombre || coincidePelicula;
    });

    return (
        <main className="ventas-page">
            <div className="ventas-header">
                <div>
                    <h1>💳 Historial de Ventas</h1>
                    <p>Consulta y administra las reservas realizadas.</p>
                </div>
            </div>

            <div className="tabla-container">
                <HistorialVentas/>
            </div>
        </main>
    );
}
