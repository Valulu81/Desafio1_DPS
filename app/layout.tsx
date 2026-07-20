import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Sistema de Cine",
  description: "Gestión de venta de entradas para cine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}