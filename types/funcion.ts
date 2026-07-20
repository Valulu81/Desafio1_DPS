import { Asiento } from "./asientos";

export interface Funcion {
    id: string;
    hora: string; 
    salaId: string;
    asientos: Asiento[];
}