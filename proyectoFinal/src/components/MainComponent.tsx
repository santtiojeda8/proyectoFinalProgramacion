import React, { useState } from 'react';
import BranchForms from './BranchForms'; // Asegúrate de que la ruta sea correcta

const MainComponent: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [branchData, setBranchData] = useState<any>(null); // Estado para almacenar los datos de la sucursal

  const handleAddBranchClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleConfirm = (data: any) => {
    setBranchData(data); // Guardar los datos en el estado
    setShowForm(false); // Cerrar el formulario
  };

  const handleClosePopup = () => {
    setBranchData(null); // Limpiar los datos del popup
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Sucursales</h1>
      <button onClick={handleAddBranchClick} style={{ backgroundColor: 'green', color: 'white' }}>
        Agregar Sucursal
      </button>

      {showForm && (
        <div style={{ marginTop: '20px' }}>
          <BranchForms onCancel={handleCancel} onConfirm={handleConfirm} />
        </div>
      )}

      {branchData && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid black',
          borderRadius: '8px',
          zIndex: 1000,
        }}>
          <h2>Datos de la Sucursal</h2>
          <pre>{JSON.stringify(branchData, null, 2)}</pre>
          <button onClick={handleClosePopup} style={{ backgroundColor: 'red' }}>Cerrar</button>
        </div>
      )}

      {branchData && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }} />}
    </div>
  );
};

export default MainComponent;