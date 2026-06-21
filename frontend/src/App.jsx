import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import RegistroPracticante from './components/RegistroPracticante';
import PanelAnalista from './components/PanelAnalista';

const enlaceClassName = ({ isActive }) => (isActive ? 'topbar-link active' : 'topbar-link');

function App() {
  return (
    <BrowserRouter>
      <main className="page-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Prueba tecnica</p>
            <h1>Plataforma Basica de Seleccion de Practicantes</h1>
          </div>

          <nav className="topbar-nav">
            <NavLink to="/registro" className={enlaceClassName}>
              Candidatos
            </NavLink>
            <NavLink to="/admin" className={enlaceClassName}>
              Analistas
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/registro" replace />} />
          <Route
            path="/registro"
            element={
              <section className="hero-card">
                <p className="hero-text">
                  Vista publica para que los practicantes registren su informacion y suban su hoja de vida en PDF.
                </p>
                <RegistroPracticante />
              </section>
            }
          />
          <Route
            path="/admin"
            element={
              <section className="hero-card">
                <p className="hero-text">
                  Vista interna para revisar candidatos, descargar la hoja de vida y cambiar su estado.
                </p>
                <PanelAnalista />
              </section>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
