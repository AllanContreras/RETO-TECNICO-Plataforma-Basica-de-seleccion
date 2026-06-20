import { useState } from 'react';
import { registrarPracticante } from '../services/api';

const estadoInicial = {
  nombre: '',
  correo: '',
  carrera: '',
  semestre: '',
};

function RegistroPracticante() {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  };

  const manejarArchivo = (evento) => {
    const pdf = evento.target.files[0] || null;

    if (pdf && pdf.type !== 'application/pdf') {
      setError('Solo se permite subir archivos PDF');
      setArchivo(null);
      evento.target.value = '';
      return;
    }

    setError('');
    setArchivo(pdf);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');
    setMensaje('');

    if (!formulario.nombre || !formulario.correo || !formulario.carrera || !formulario.semestre || !archivo) {
      setError('Completa todos los campos y adjunta la hoja de vida en PDF');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', formulario.nombre);
    formData.append('correo', formulario.correo);
    formData.append('carrera', formulario.carrera);
    formData.append('semestre', formulario.semestre);
    formData.append('hojaVida', archivo);

    try {
      setCargando(true);
      await registrarPracticante(formData);
      setMensaje('Registro enviado correctamente.');
      setFormulario(estadoInicial);
      setArchivo(null);
      evento.target.reset();
    } catch (apiError) {
      const respuesta = apiError?.response?.data?.message;
      setError(respuesta || 'No fue posible registrar el practicante');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="form-card">
      <h2>Registro de practicante</h2>
      <form className="practicante-form" onSubmit={manejarEnvio}>
        <label>
          Nombre completo
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ej. Laura Gómez"
          />
        </label>

        <label>
          Correo electronico
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            placeholder="ejemplo@correo.com"
          />
        </label>

        <label>
          Carrera universitaria
          <input
            type="text"
            name="carrera"
            value={formulario.carrera}
            onChange={manejarCambio}
            placeholder="Ej. Ingenieria de Sistemas"
          />
        </label>

        <label>
          Semestre actual
          <input
            type="text"
            name="semestre"
            value={formulario.semestre}
            onChange={manejarCambio}
            placeholder="Ej. 8"
          />
        </label>

        <label>
          Hoja de vida PDF
          <input type="file" accept="application/pdf" onChange={manejarArchivo} />
        </label>

        {error ? <p className="message error">{error}</p> : null}
        {mensaje ? <p className="message success">{mensaje}</p> : null}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Registrar practicante'}
        </button>
      </form>
    </section>
  );
}

export default RegistroPracticante;
