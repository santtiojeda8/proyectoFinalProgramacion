import { createSlice } from '@reduxjs/toolkit';

interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  imagen: string;
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
  },
});

export const { agregarEmpresa, eliminarEmpresa, editarEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
