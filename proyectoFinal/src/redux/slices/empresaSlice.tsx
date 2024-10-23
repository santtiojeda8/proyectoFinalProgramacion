
import { createSlice } from '@reduxjs/toolkit';

interface Sucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
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
  imagen: string;
}

interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  imagen: string;
  sucursales: Sucursal[];
}

const initialState: Empresa[] = [];

const empresaSlice = createSlice({
  name: 'empresas',
  initialState,
  reducers: {
    agregarEmpresa(state, action) {
      state.push(action.payload);
    },
    eliminarEmpresa(state, action) {
      return state.filter((empresa) => empresa.id !== action.payload);
    },
    editarEmpresa(state, action) {
      const empresa = state.find((empresa) => empresa.id === action.payload.id);
      if (empresa) {
        empresa.nombre = action.payload.nombre;
        empresa.razonSocial = action.payload.razonSocial;
        empresa.imagen = action.payload.imagen;
      }
    },
    agregarSucursal(state, action) {
      const empresa = state.find((empresa) => empresa.id === action.payload.empresaId);
      if (empresa) {
        empresa.sucursales.push(action.payload.sucursal);
      }
    },
    eliminarSucursal(state, action) {
      const empresa = state.find((empresa) => empresa.id === action.payload.empresaId);
      if (empresa) {
        empresa.sucursales = empresa.sucursales.filter((sucursal) => sucursal.id !== action.payload.sucursalId);
      }
    },
    editarSucursal(state, action) {
      const empresa = state.find((empresa) => empresa.id === action.payload.empresaId);
      if (empresa) {
        const sucursal = empresa.sucursales.find((sucursal) => sucursal.id === action.payload.sucursalId);
        if (sucursal) {
          sucursal.nombre = action.payload.sucursal.nombre;
          sucursal.horarioApertura = action.payload.sucursal.horarioApertura;
          sucursal.horarioCierre = action.payload.sucursal.horarioCierre;
          sucursal.pais = action.payload.sucursal.pais;
          sucursal.provincia = action.payload.sucursal.provincia;
          sucursal.localidad = action.payload.sucursal.localidad;
          sucursal.latitud = action.payload.sucursal.latitud;
          sucursal.longitud = action.payload.sucursal.longitud;
          sucursal.calle = action.payload.sucursal.calle;
          sucursal.numeroCalle = action.payload.sucursal.numeroCalle;
          sucursal.codigoPostal = action.payload.sucursal.codigoPostal;
          sucursal.piso = action.payload.sucursal.piso;
          sucursal.departamento = action.payload.sucursal.departamento;
          sucursal.imagen = action.payload.sucursal.imagen;
        }
      }
    },
  },
});

export const {
  agregarEmpresa,
  eliminarEmpresa,
  editarEmpresa,
  agregarSucursal,
  eliminarSucursal,
  editarSucursal,
} = empresaSlice.actions;

export default empresaSlice.reducer;
