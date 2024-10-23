import React, { useState } from 'react';
import Empresa from './Empresas';
import Sucursal from '../Sucursal/Sucursal';
import style from './Contenedor.module.css'


interface EmpresaType {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: string;
  imagen: File | null;
  sucursales: { id: number; nombre: string; direccion: string }[];
}

const Contenedor: React.FC = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<EmpresaType | null>(null);

  return (
    <div className={style.contenedor}>
      <div className={style.izquierda}>
        <Empresa setEmpresaSeleccionada={setEmpresaSeleccionada} />
      </div>
      <div className={style.derecha}>
        {empresaSeleccionada && <Sucursal empresaSeleccionada={empresaSeleccionada} />}
      </div>
    </div>
  );
};

export default Contenedor;
