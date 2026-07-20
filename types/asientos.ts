export type EstadoAsiento = "libre" | "ocupado" | "seleccionado";

export interface Asiento {
    id: string;
    fila: string;
    numero: number;
    estado: EstadoAsiento;
}
