import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/navbar';
import Providers from "./providers"

export const metadata = {
  title: 'Sistema de Cine',
  description: 'Proyecto DPS',
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
          <Navbar />
          {children}
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
        </Providers>

      </body>
    </html>
  );
}