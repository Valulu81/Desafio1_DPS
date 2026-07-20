import { Funcion } from "./funcion";

export interface Pelicula {
    id: number;
    codigo: string;
    nombre: string;
    genero: string;
    duracion: number; // en minutos
    clasificacion: string;
    sala: string;
    precio: number;
    estado: "Disponible" | "No disponible";
    imagen: string;
    descripcion?: string;
}