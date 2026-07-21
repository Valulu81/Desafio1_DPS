"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Reserva } from "@/types/reserva"

interface VentasFilaProps {
    reserva: Reserva;
}

export default function VentasFila({ reserva }: VentasFilaProps) {
    return (
        <tr className="reserva-fila">
            <td>{reserva.id}</td>
            <td>{reserva.nombre}</td>
            <td>{reserva.email}</td>
            <td>{reserva.pelicula}</td>           
            <td>{reserva.hora}</td>
            <td>{reserva.sala}</td>
            <td>{reserva.boletos}</td>
            {/* <td>{reserva.boletos.map((a) => a.numero).join(", ")}</td> */}
            <td>{reserva.monto}</td>
        </tr>
    );
}
