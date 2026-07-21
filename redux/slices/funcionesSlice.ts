import { createSlice } from "@reduxjs/toolkit";
import { Funcion } from "@/types/funcion";

const initialState: Funcion[] = [];

const funcionesSlice = createSlice({
    name: "funciones",
    initialState,
    reducers: {
        setFunciones: (state, action) => action.payload,
    },
});

export const { setFunciones } = funcionesSlice.actions;
export default funcionesSlice.reducer;
