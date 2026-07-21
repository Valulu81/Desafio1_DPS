"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { useAppSelector } from "../../redux/hooks";

export default function GraficoPeliculas() {

    const peliculas = useAppSelector(
        (state) => state.peliculas
    );

    const conteoPorGenero = peliculas.reduce(
        (acc: Record<string, number>, pelicula) => {
            acc[pelicula.genero] =
                (acc[pelicula.genero] ?? 0) + 1;
            return acc;
        },
        {}
    );

    const data = Object.entries(conteoPorGenero).map(
        ([genero, cantidad]) => ({
            genero,
            cantidad,
        })
    );

    return (
        <div className="chart-card">

            <div
                style={{
                    width: "100%",
                    height: "300px",
                }}
            >
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="genero" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="cantidad"
                            fill="#0ea5e9"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}