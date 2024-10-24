import React, { useState } from 'react';
import styles from './Sucursal.module.css';
import Direccion from './Direccion'; // Importa el componente Direccion

// Interfaz para la estructura de Sucursal
interface Sucursal {
  id: number;
  nombre: string;
  direccion: {
    pais: string;
    provincia: string;
    localidad: string;
    latitud: number;
    longitud: number;
    calle: string;
    numeroCalle: number;
    codigoPostal: number;
    piso: number;
    departamento: number;
  };
}

// Interfaz para la estructura de Empresa
interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: File | null;
  sucursales: Sucursal[];
}

interface Props {
  empresaSeleccionada: Empresa;
}

// Componente de Sucursal
const Sucursal: React.FC<Props> = ({ empresaSeleccionada }) => {
  const [mostrarPopupAgregarSucursal, setMostrarPopupAgregarSucursal] = useState(false);
  const [mostrarPopupVerDatos, setMostrarPopupVerDatos] = useState(false);
  const [mostrarPopupEditar, setMostrarPopupEditar] = useState(false);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<Sucursal | null>(null);
  const [nombreSucursal, setNombreSucursal] = useState('');
  const dummySetDireccion = (direccion: any) => {
    // No hacer nada
  };
  
  const [direccionSucursal, setDireccionSucursal] = useState({
    pais: '',
    provincia: '',
    localidad: '',
    latitud: 0,
    longitud: 0,
    calle: '',
    numeroCalle: 0,
    codigoPostal: 0,
    piso: 0,
    departamento: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleAgregarSucursal = () => {
    setMostrarPopupAgregarSucursal(true);
    setNombreSucursal(''); // Resetear nombre al abrir el popup
    setDireccionSucursal({ pais: '', provincia: '', localidad: '', latitud: 0, longitud: 0, calle: '', numeroCalle: 0, codigoPostal: 0, piso: 0, departamento: 0 });
  };

  const handleVerDatos = (sucursal: Sucursal) => {
    setSucursalSeleccionada(sucursal);
    setMostrarPopupVerDatos(true);
  };

  const handleEditar = (sucursal: Sucursal) => {
    setSucursalSeleccionada(sucursal);
    setMostrarPopupEditar(true);
    setNombreSucursal(sucursal.nombre);
    setDireccionSucursal(sucursal.direccion);
  };

  const handleGuardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreSucursal || !direccionSucursal.calle) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    if (!sucursalSeleccionada) {
      console.error("No se seleccionó ninguna sucursal para actualizar");
      return; // O maneja el error de otra manera
    }
  
    const sucursalActualizada: Sucursal = {
      id: sucursalSeleccionada.id, // Aquí es seguro usar id
      nombre: nombreSucursal,
      direccion: direccionSucursal,
    };
    
    const nuevasSucursales = empresaSeleccionada.sucursales.map((s) =>
      s.id === sucursalSeleccionada.id ? sucursalActualizada : s
    );
    empresaSeleccionada.sucursales = nuevasSucursales;
    setMostrarPopupEditar(false);
    resetForm();
    setError(null);
  };

  const handleGuardarSucursal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreSucursal || !direccionSucursal.calle) {
      setError('Por favor, complete todos los campos');
      return;
    }
    const nuevaSucursal: Sucursal = {
      id: empresaSeleccionada.sucursales.length + 1,
      nombre: nombreSucursal,
      direccion: direccionSucursal,
    };
    empresaSeleccionada.sucursales.push(nuevaSucursal);
    setMostrarPopupAgregarSucursal(false);
    resetForm();
    setError(null);
  };

  const handleEliminar = () => {
    if (sucursalSeleccionada) {
      const nuevasSucursales = empresaSeleccionada.sucursales.filter(
        (s) => s.id !== sucursalSeleccionada.id
      );
      empresaSeleccionada.sucursales = nuevasSucursales;
      setMostrarPopupEditar(false);
      setSucursalSeleccionada(null);
    }
  };

  const resetForm = () => {
    setNombreSucursal('');
    setDireccionSucursal({
      pais: '',
      provincia: '',
      localidad: '',
      latitud: 0,
      longitud: 0,
      calle: '',
      numeroCalle: 0,
      codigoPostal: 0,
      piso: 0,
      departamento: 0,
    });
  };

  return (
    <div className={styles.Sucursal}>
      <div className={styles.contenedorTitulo}>
      <h2>Sucursales de {empresaSeleccionada.nombre}</h2>
      <button style={{backgroundColor:'#75e26b',color:'black'}} onClick={handleAgregarSucursal}>Agregar Sucursal</button>
      </div>
      {empresaSeleccionada.sucursales.map((sucursal) => (
        <div key={sucursal.id}>
          <h3>{sucursal.nombre}</h3>
          <p>
            Dirección: {sucursal.direccion.calle}, {sucursal.direccion.localidad},{' '}
            {sucursal.direccion.provincia}
          </p>
          <button onClick={() => handleVerDatos(sucursal)}>Ver Datos</button>
          <button onClick={() => handleEditar(sucursal)}>Editar</button>
        </div>
      ))}
     {mostrarPopupVerDatos && (
  <div className={styles.popupVerDatos}>
    <h2>Ver Datos</h2>
    <label>Nombre:</label>
    <p>{sucursalSeleccionada?.nombre}</p>
    {sucursalSeleccionada && (
  <Direccion direccion={sucursalSeleccionada.direccion} setDireccion={dummySetDireccion} soloLectura={true} />
)}

    <button onClick={() => setMostrarPopupVerDatos(false)}>Cancelar</button>
  </div>
)}


      {mostrarPopupEditar && (
        <div className={styles.popupEditar}>
          <h2>Editar Sucursal</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleGuardarCambios}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombreSucursal}
              onChange={(e) => setNombreSucursal(e.target.value)}
              required
            />
            <br />
            <Direccion
              direccion={direccionSucursal}
              setDireccion={setDireccionSucursal}
            />
            <br />
            <div className={styles.botones}>
              <button
                style={{ backgroundColor: '#ee3131', color: 'black' }}
                onClick={() => setMostrarPopupEditar(false)}
              >
                Cancelar
              </button>
              <button
                style={{ backgroundColor: '#57ee4a', color: 'black' }}
                type="submit"
              >
                Guardar Cambios
              </button>
              <button
                style={{ backgroundColor: '#ee3131', color: 'black' }}
                onClick={handleEliminar}
              >
                Eliminar Sucursal
              </button>
            </div>
          </form>
        </div>
      )}
      {mostrarPopupAgregarSucursal && (
        <div className={styles.popupAgregarSucursal}>
          <h2>Agregar Sucursal</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleGuardarSucursal}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombreSucursal}
              onChange={(e) => setNombreSucursal(e.target.value)}
              required
            />
            <br />
            <Direccion
              direccion={direccionSucursal}
              setDireccion={setDireccionSucursal}
            />
            <br />
            <div className={styles.botones}>
              <button
                style={{ backgroundColor: '#ee3131', color: 'black' }}
                onClick={() => setMostrarPopupAgregarSucursal(false)}
              >
                Cancelar
              </button>
              <button
                style={{ backgroundColor: '#57ee4a', color: 'black' }}
                type="submit"
              >
                Guardar Sucursal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Sucursal;