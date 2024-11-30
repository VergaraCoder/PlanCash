// src/redux/counterSlice.ts
import { PayloadAction } from '@reduxjs/toolkit';

// Definimos el tipo de estado
interface CounterState {
  name: string;
  email: string;
  password: string;
}

// Estado inicial
const initialState: CounterState = {
  name: '',
  email: '',
  password: ''
};


const RETURN_ALL_DATA = 'RETURN_ALL_DATA';
const SET_EMAIL = 'SET_EMAIL';


interface SetNameAction {
  type: typeof RETURN_ALL_DATA;
  payload: string;  
}

interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string;  
}

type UserActionTypes = SetNameAction | SetEmailAction;

const userReducer = (state: CounterState = initialState, action: any): any => {
  switch (action.type) {
    case RETURN_ALL_DATA:        
      return { ...state,...action.payload };  
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
