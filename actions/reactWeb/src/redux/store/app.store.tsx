import { configureStore } from "@reduxjs/toolkit";
import allReducer from '../reducer/counter.reducer';


export const store = configureStore({
    reducer: {
      user: allReducer  // Aquí estás usando el reducer para manejar el estado 'user'
    }
  });


