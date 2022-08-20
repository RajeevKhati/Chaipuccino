import {updateBaseRecipe} from '../../../service/api';
import {navigate} from '../../../service/navigation';
import {
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
} from './actionTypes';

export const updateRecipe = formPayload => dispatch => {
  dispatch({
    type: UPDATE_RECIPE_REQUEST,
  });
  updateBaseRecipe(formPayload)
    .then(res => {
      navigate('BaseRecipe');
      dispatch({
        type: UPDATE_RECIPE_SUCCESS,
        payload: formPayload,
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_RECIPE_ERROR,
        payload: err,
      });
    });
};
