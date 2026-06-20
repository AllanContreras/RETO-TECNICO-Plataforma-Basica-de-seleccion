import RegistroPracticante from './components/RegistroPracticante';
import PanelAnalista from './components/PanelAnalista';

function App() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Prueba tecnica</p>
        <h1>Plataforma Basica de Seleccion de Practicantes</h1>
        <p className="hero-text">
          Formulario de registro para practicantes con subida de hoja de vida en PDF.
        </p>
      </section>

      <RegistroPracticante />

      <PanelAnalista />
    </main>
  );
}

export default App;
