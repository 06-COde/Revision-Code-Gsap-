import { configureStore } from '@reduxjs/toolkit';
import togglebtn from './toggleSlice';

const appStore = configureStore({
  reducer: {
    togglebtn: togglebtn, 
  },
});

export default appStore;
