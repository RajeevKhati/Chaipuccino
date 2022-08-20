import React from 'react';
import {createContext, useReducer} from 'react';
import recipeInitialState from './initialStates/recipeInitialState';
import recipe from './reducers/recipe';

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {
  const [recipeState, recipeDispatch] = useReducer(recipe, recipeInitialState);

  return (
    <GlobalContext.Provider value={{recipeState, recipeDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};
