import {
  GET_RECIPE_ERROR,
  GET_RECIPE_REQUEST,
  GET_RECIPE_SUCCESS,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
} from '../actions/recipe/actionTypes';

const recipe = (state, {type, payload}) => {
  switch (type) {
    case GET_RECIPE_REQUEST:
    case UPDATE_RECIPE_REQUEST: {
      return {...state, loading: true};
    }
    case GET_RECIPE_SUCCESS: {
      return {...state, recipe: payload, loading: false};
    }
    case UPDATE_RECIPE_SUCCESS: {
      return {...state, recipe: payload, loading: false};
    }
    case GET_RECIPE_ERROR:
    case UPDATE_RECIPE_ERROR: {
      return {...state, error: payload, loading: false};
    }
    default:
      return state;
  }
};

export default recipe;
