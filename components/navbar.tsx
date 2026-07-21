import Link from 'next/link';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid ms-3 ">
        <Link className="navbar-brand text-white" href="/">
          Cinecitoo
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/peliculas">
                Películas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/ventas">
                Ventas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/asientos">
                Configuración
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
