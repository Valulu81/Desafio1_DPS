"use client"
import '@/styles/ventas.css';
import { Reserva } from '@/types/reserva';
import VentasFila from './ventasFila';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function HistorialVentas() {
    const reservas = useSelector((state: RootState) => state.reservas.lista)
    return (
        <div className="historial-ventas">
            <table className='tabla-ventas'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Pelicula</th>
                        <th>Hora</th>
                        <th>Sala</th>
                        <th>Boletos.</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="tabla-vacia">
                                No se encontraron reservas
                            </td>
                        </tr>
                    ) : (
                        reservas.map((reserva) => (
                            <VentasFila key={reserva.id} reserva={reserva} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}