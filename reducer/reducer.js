import { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
    user: null
  }

const reducer = (state, action) => {
    switch (action.type) {
      case 'AUTH_USER':
        return {...state, user: action.payload};
      default:
        return state;
    }
  }
 

  export { reducer, AppContext, initialState }