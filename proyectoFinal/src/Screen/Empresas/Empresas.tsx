import React, { useState } from 'react';
import styles from "./Empresas.module.css";

interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: string; // Añadido CUIL
  imagen: File | null;
}

const Empresa: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [mostrarPopupAgregar, setMostrarPopupAgregar] = useState(false);
  const [mostrarPopupVerDatos, setMostrarPopupVerDatos] = useState(false);
  const [mostrarPopupEditar, setMostrarPopupEditar] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [cuil, setCuil] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleAgregarEmpresa = () => {
    setMostrarPopupAgregar(true);
  };

  const handleGuardarEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaEmpresa: Empresa = {
      id: empresas.length + 1,
      nombre,
      razonSocial,
      cuil,
      imagen,
    };
    setEmpresas([...empresas, nuevaEmpresa]);
    setMostrarPopupAgregar(false);
    setNombre('');
    setRazonSocial('');
    setCuil('');
    setImagen(null);
  };

  const handleVerDatos = (empresa: Empresa) => {
    setMostrarPopupVerDatos(true);
    setEmpresaSeleccionada(empresa);
  };

  const handleEditar = (empresa: Empresa) => {
    setMostrarPopupEditar(true);
    setEmpresaSeleccionada(empresa);
  };

  const handleGuardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    if (empresaSeleccionada) {
      const nuevasEmpresas = empresas.map((e) =>
        e.id === empresaSeleccionada.id ? empresaSeleccionada : e
      );
      setEmpresas(nuevasEmpresas);
      setMostrarPopupEditar(false);
    }
  };

  return (
    <div>
      <button onClick={handleAgregarEmpresa}>Agregar Empresa</button>
      {mostrarPopupAgregar && (
        <div className={styles.popupEditar}>
          <h2>Agregar Empresa</h2>
          <form onSubmit={handleGuardarEmpresa}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <br />
            <label>Razón Social:</label>
            <input
              type="text"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              required
            />
            <br />
            <label>Cuil:</label>
            <input
              type="text" // Cambiado a text para aceptar el CUIL
              value={cuil}
              onChange={(e) => setCuil(e.target.value)}
              required
            />
            <br />
            <label>Imagen (JPG):</label>
            <input
              type="file"
              accept=".jpg"
              onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
            />
            <br />
            <button type="submit">Guardar Empresa</button>
          </form>
          <button onClick={() => setMostrarPopupAgregar(false)}>Cancelar</button>
        </div>
      )}
      {empresas.map((empresa) => (
        <div key={empresa.id}>
          <h2>{empresa.nombre}</h2>
          <button onClick={() => handleVerDatos(empresa)}>Ver Datos</button>
          <button onClick={() => handleEditar(empresa)}>Editar</button>
        </div>
      ))}
      {mostrarPopupVerDatos && empresaSeleccionada && (
        <div className={styles.popupVerDatos}>
          <h2>Ver Datos de Empresa</h2>
          <p>Nombre: {empresaSeleccionada.nombre}</p>
          <p>Razón Social: {empresaSeleccionada.razonSocial}</p>
          <p>Cuil: {empresaSeleccionada.cuil}</p>
          <p>Imagen: {empresaSeleccionada.imagen?.name}</p>
          {empresaSeleccionada.imagen && (
            <img src={URL.createObjectURL(empresaSeleccionada.imagen)} alt={empresaSeleccionada.nombre} width="100" />
          )}
          <button onClick={() => setMostrarPopupVerDatos(false)}>Cerrar</button>
        </div>
      )}
      {mostrarPopupEditar && empresaSeleccionada && (
        <div className={styles.popupEditar}>
          <h2>Editar Empresa</h2>
          <form onSubmit={handleGuardarCambios}>
            <label>Nombre:</label>
            <input
              type="text"
              value={empresaSeleccionada.nombre}
              onChange={(e) =>
                setEmpresaSeleccionada({
                  ...empresaSeleccionada,
                  nombre: e.target.value,
                })
              }
              required
            />
            <br />
            <label>Razón Social:</label>
            <input
              type="text"
              value={empresaSeleccionada.razonSocial}
              onChange={(e) =>
                setEmpresaSeleccionada({
                  ...empresaSeleccionada,
                  razonSocial: e.target.value,
                })
              }
              required
            />
            <br />
            <label>Cuil:</label>
            <input
              type="text"
              value={empresaSeleccionada.cuil}
              onChange={(e) =>
                setEmpresaSeleccionada({
                  ...empresaSeleccionada,
                  cuil: e.target.value,
                })
              }
              required
            />
            <br />
            <label>Imagen (JPG):</label>
            <input
              type="file"
              accept=".jpg"
              onChange={(e) =>
                setEmpresaSeleccionada({
                  ...empresaSeleccionada,
                  imagen: e.target.files ? e.target.files[0] : null,
                })
              }
            />
            <br />
            <button type="submit">Guardar Cambios</button>
          </form>
          <button onClick={() => setMostrarPopupEditar(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Empresa;