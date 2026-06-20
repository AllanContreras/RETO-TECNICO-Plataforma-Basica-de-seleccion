import { useEffect, useState } from 'react';
import {
  MEDIA_BASE_URL,
  actualizarEstadoPracticante,
  obtenerPracticantes,
} from '../services/api';

function PanelAnalista() {
  const [practicantes, setPracticantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [actualizandoId, setActualizandoId] = useState('');

  const cargarPracticantes = async () => {
    try {
      setCargando(true);
      setError('');
      const data = await obtenerPracticantes();
      setPracticantes(data);
    } catch {
      setError('No fue posible cargar los candidatos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPracticantes();
  }, []);

  const manejarCambioEstado = async (id, estado) => {
    try {
      setActualizandoId(id);
      await actualizarEstadoPracticante(id, estado);
      await cargarPracticantes();
    } catch {
      setError('No fue posible actualizar el estado del candidato');
    } finally {
      setActualizandoId('');
    }
  };

  return (
    <section className="panel-card">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Analista de seleccion</p>
          <h2>Revision de candidatos</h2>
        </div>
        <button type="button" className="ghost-button" onClick={cargarPracticantes}>
          Refrescar
        </button>
      </div>

      {error ? <p className="message error">{error}</p> : null}
      {cargando ? <p className="empty-state">Cargando candidatos...</p> : null}
      {!cargando && practicantes.length === 0 ? (
        <p className="empty-state">Aun no hay candidatos registrados.</p>
      ) : null}

      <div className="candidate-grid">
        {practicantes.map((practicante) => (
          <article className="candidate-card" key={practicante._id}>
            <div className="candidate-top">
              <div>
                <h3>{practicante.nombre}</h3>
                <p>{practicante.correo}</p>
              </div>
              <span className={`status-pill ${practicante.estado.toLowerCase().replace(' ', '-')}`}>
                {practicante.estado}
              </span>
            </div>

            <dl className="candidate-info">
              <div>
                <dt>Carrera</dt>
                <dd>{practicante.carrera}</dd>
              </div>
              <div>
                <dt>Semestre</dt>
                <dd>{practicante.semestre}</dd>
              </div>
              <div>
                <dt>Registro</dt>
                <dd>{new Date(practicante.createdAt).toLocaleDateString('es-CO')}</dd>
              </div>
            </dl>

            <div className="candidate-actions">
              <a
                className="secondary-button"
                href={`${MEDIA_BASE_URL}/uploads/${practicante.hojaVida}`}
                target="_blank"
                rel="noreferrer"
              >
                Descargar hoja de vida
              </a>

              <select
                value={practicante.estado}
                onChange={(evento) => manejarCambioEstado(practicante._id, evento.target.value)}
                disabled={actualizandoId === practicante._id}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Viable">Viable</option>
                <option value="No viable">No viable</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PanelAnalista;