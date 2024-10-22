import { configureStore } from '@reduxjs/toolkit';
import empresaReducer from '../slices/empresaSlice';

const store = configureStore({
  reducer: {
    empresas: empresaReducer,
  },
});

export default store;
