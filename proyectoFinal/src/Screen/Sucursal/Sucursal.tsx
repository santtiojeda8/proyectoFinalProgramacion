import React from 'react';
import styles from './Sucursal.module.css';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
}

interface Props {
  empresaSeleccionada: {
    id: number;
    nombre: string;
    razonSocial: string;
    cuil: string;
    imagen: File | null;
    sucursales: Sucursal[];
  };
}

const Sucursal: React.FC<Props> = ({ empresaSeleccionada }) => {
  const [mostrarPopupAgregarSucursal, setMostrarPopupAgregarSucursal] = React.useState(false);
  const [nombreSucursal, setNombreSucursal] = React.useState('');
  const [direccionSucursal, setDireccionSucursal] = React.useState('');

  const handleAgregarSucursal = () => {
    setMostrarPopupAgregarSucursal(true);
  };

  const handleGuardarSucursal = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaSucursal: Sucursal = {
      id: empresaSeleccionada.sucursales.length + 1,
      nombre: nombreSucursal,
      direccion: direccionSucursal,
    };
    empresaSeleccionada.sucursales.push(nuevaSucursal);
    setMostrarPopupAgregarSucursal(false);
    setNombreSucursal('');
    setDireccionSucursal('');
  };

  return (
    <div className={styles.Sucursal}>
      <h2>Sucursales de {empresaSeleccionada.nombre}</h2>
      <button onClick={handleAgregarSucursal}>Agregar Sucursal</button>
      {mostrarPopupAgregarSucursal && (
        <div className={styles.popupAgregarSucursal}>
          <h2>Agregar Sucursal</h2>
          <form onSubmit={handleGuardarSucursal}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombreSucursal}
              onChange={(e) => setNombreSucursal(e.target.value)}
              required
            />
            <br />
            <label>Dirección:</label>
            <input
              type="text"
              value={direccionSucursal}
              onChange={(e) => setDireccionSucursal(e.target.value)}
              required
            />
            <br />
            <button type="submit">Guardar Sucursal</button>
          </form>
          <button onClick={() => setMostrarPopupAgregarSucursal(false)}>Cancelar</button>
        </div>
      )}
      {empresaSeleccionada.sucursales.map((sucursal) => (
        <div key={sucursal.id}>
          <h3>{sucursal.nombre}</h3>
          <p>Dirección: {sucursal.direccion}</p>
        </div>
      ))}
    </div>
  );
};
export default Sucursal;