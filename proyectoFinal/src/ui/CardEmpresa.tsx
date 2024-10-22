import React from 'react';


interface Empresa {
  id: number;
  nombre: string;
}

interface Props {
  empresa: Empresa;
  onEditar: (empresa: Empresa) => void;
  onVerDatos: (empresa: Empresa) => void;
}

const CardEmpresa: React.FC<Props> = ({ empresa, onEditar, onVerDatos }) => {
  return (
    <div className="tarjeta-empresa">
      <h2>{empresa.nombre}</h2>
      <div className="botones">
        <button onClick={() => onEditar(empresa)}>Editar</button>
        <button onClick={() => onVerDatos(empresa)}>Ver Datos</button>
      </div>
    </div>
  );
};
export default CardEmpresa;
