import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asiento } from "@/types/asientos";

interface Reserva {
    funcionId: string;
    peliculaId: string;
    cliente: { nombre: string; correo: string; telefono: string };
    asientos: Asiento[];
}

interface ReservasState {
    lista: Reserva[];
}

const initialState: ReservasState = {
    lista: [],
};

const reservasSlice = createSlice({
    name: "reservas",
    initialState,
    reducers: {
        agregarReserva: (state, action: PayloadAction<Reserva>) => {
            state.lista.push(action.payload);
        },
    },
});

export const { agregarReserva } = reservasSlice.actions;
export default reservasSlice.reducer;
