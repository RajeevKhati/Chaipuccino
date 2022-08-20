import {getBaseRecipe} from '../../../service/api';
import {
  GET_RECIPE_ERROR,
  GET_RECIPE_REQUEST,
  GET_RECIPE_SUCCESS,
} from './actionTypes';

export const getRecipe = () => dispatch => {
  dispatch({
    type: GET_RECIPE_REQUEST,
  });
  getBaseRecipe()
    .then(res => {
      dispatch({
        type: GET_RECIPE_SUCCESS,
        payload: res._data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_RECIPE_ERROR,
        payload: err,
      });
    });
};
