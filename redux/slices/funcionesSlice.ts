import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Funcion } from "@/types/funcion";

interface UpdateAsientosPayload {
    funcionId: string;
    asientosOcupados: string[];
}

interface FuncionesState {
    lista: Funcion[];
}
const initialState: Funcion[] = [];

const funcionesSlice = createSlice({
    name: "funciones",
    initialState,
    reducers: {
        setFunciones: (state, action: PayloadAction<Funcion[]>) => {
            return action.payload;
        },
        actualizarAsientos: (
            state,
            action: PayloadAction<{ funcionId: string; asientosOcupados: string[] }>
        ) => {
            const { funcionId, asientosOcupados } = action.payload;
            const funcion = state.find((f) => f.id === funcionId); 

            if (funcion) {
                funcion.asientos = funcion.asientos.map((asiento) =>
                    asientosOcupados.includes(asiento.id)
                        ? { ...asiento, estado: "ocupado" }
                        : asiento
                );
            }
        }
    },
});

export const { setFunciones, actualizarAsientos } = funcionesSlice.actions;
export default funcionesSlice.reducer;
