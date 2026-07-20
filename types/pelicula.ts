import { Funcion } from "./funcion";
export interface Pelicula {
    id: string;
    titulo: string;
    duracion: number;
    clasificacion: string;
    funciones: string[];
}