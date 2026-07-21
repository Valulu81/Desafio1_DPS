
import React, {useState} from "react";
import { Pelicula } from "@/types//pelicula";
import { peliculas } from "@/data/peliculas";

export const VentaEntradas: React.FC = () => {
    const [selectedMovie, setSelectedMovie] = useState<Pelicula | null>(null);

    return (
        <div className="venta-entradas">
            <h2>Seleccionar Película</h2>
            <div className="grid-peliculas">
                {peliculas.map((peli: Pelicula) => (
                    <div key={peli.id} className="card-pelicula">
                        <img src={peli.imagen} alt={peli.nombre} className="card-imagen" />
                        <div className="card-body">
                            <h3>{peli.nombre}</h3>
                            <p>{peli.genero} • {peli.duracion} min</p>
                            <p>Clasificación: {peli.clasificacion}</p>
                            <p>Precio: ${peli.precio}</p>
                            <button
                                disabled={peli.estado === "No disponible"}
                                className="btn-seleccionar"
                                onClick={() => setSelectedMovie(peli)}
                            >
                                {peli.estado === "Disponible" ? "Comprar Entrada" : "No disponible"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedMovie && (
                <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedMovie.nombre}</h2>
                        <p>{selectedMovie.descripcion}</p>
                        <h4>Funciones disponibles:</h4>
                        <ul>
                            {selectedMovie.funciones?.map((funcion, idx) => (
                                <li key={idx}>{funcion}</li>
                            )) || <li>No hay funciones disponibles</li>}
                        </ul>
                        <button className="btn-cerrar" onClick={() => setSelectedMovie(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};