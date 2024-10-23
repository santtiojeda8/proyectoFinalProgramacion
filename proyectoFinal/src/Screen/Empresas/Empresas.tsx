import React, { useState } from 'react';
import styles from "./Empresas.module.css";

interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: File | null;
  sucursales: SucursalType[];
}
interface FormData {
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: File | null;
}
interface SucursalType {
  id: number;
  nombre: string;
  direccion: string;
}

interface Props {
  setEmpresaSeleccionada: (empresa: Empresa | null) => void;
}

const Empresas: React.FC<Props> = ({ setEmpresaSeleccionada }) => {
  
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [mostrarPopupAgregar, setMostrarPopupAgregar] = useState(false);
  const [mostrarPopupVerDatos, setMostrarPopupVerDatos] = useState(false);
  const [mostrarPopupEditar, setMostrarPopupEditar] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionadaLocal] = useState<Empresa | null>(null);
  const [formData, setFormData] = useState<FormData>({ nombre: '', razonSocial: '', cuil: '', imagen: null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'imagen' ? files ? files[0] : null : value,
    }));
  };

  const handleAgregarEmpresa = () => {
    setMostrarPopupAgregar(true);
  };

  const handleGuardarEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaEmpresa: Empresa = {
      id: empresas.length + 1,
      nombre: formData.nombre,
      razonSocial: formData.razonSocial,
      cuil: formData.cuil,
      imagen: formData.imagen,
      sucursales: []
    };
    setEmpresas([...empresas, nuevaEmpresa]);
    setMostrarPopupAgregar(false);
    setFormData({ nombre: '', razonSocial: '', cuil: '', imagen: null });
  };

  const handleVerDatos = (empresa: Empresa) => {
    setEmpresaSeleccionadaLocal(empresa);
    setMostrarPopupVerDatos(true);
    setEmpresaSeleccionada(empresa);
  };

  const handleEditar = (empresa: Empresa) => {
    setEmpresaSeleccionadaLocal(empresa);
    setMostrarPopupEditar(true);
    setFormData({ nombre: empresa.nombre, razonSocial: empresa.razonSocial, cuil: empresa.cuil, imagen: empresa.imagen });
  };

  const handleGuardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    if (empresaSeleccionada) {
      const nuevasEmpresas = empresas.map(e => e.id === empresaSeleccionada.id ? { ...empresaSeleccionada, ...formData } : e);
      setEmpresas(nuevasEmpresas);
      setMostrarPopupEditar(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.izquierda}>
        <button onClick={handleAgregarEmpresa}>Agregar Empresa</button>
        {mostrarPopupAgregar && (
          <div className={styles.popupAgregar}>
            <h2>Agregar Empresa</h2>
            <form onSubmit={handleGuardarEmpresa}>
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              <br />
              <label>Razón Social:</label>
              <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleInputChange} required />
              <br />
              <label>Cuil:</label>
              <input type="text" name="cuil" value={formData.cuil} onChange={handleInputChange} required />
              <br />
              <label>Imagen (JPG):</label>
              <input type="file" name="imagen" accept=".jpg" onChange={handleInputChange} />
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
      </div>
      {mostrarPopupVerDatos && empresaSeleccionada && (
        <div className={styles.popupVerDatos}>
          <h2>Ver Datos</h2>
          <p>Nombre: {empresaSeleccionada.nombre}</p>
          <p>Razón Social: {empresaSeleccionada.razonSocial}</p>
          <p>Cuil: {empresaSeleccionada.cuil}</p>
          <button onClick={() => setMostrarPopupVerDatos(false)}>Cerrar</button>
        </div>
      )}
      {mostrarPopupEditar && (
        <div className={styles.popupEditar}>
          <h2>Editar Empresa</h2>
          <form onSubmit={handleGuardarCambios}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
            <br />
            <label>Razón Social:</label>
            <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleInputChange} required />
            <br />
            <label>Cuil:</label>
            <input type="text" name="cuil" value={formData.cuil} onChange={handleInputChange} required />
            <br />
            <button type="submit">Guardar Cambios</button>
          </form>
          <button onClick={() => setMostrarPopupEditar(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Empresas;