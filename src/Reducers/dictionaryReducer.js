import actionTypes from '../Constants/actionTypes';

export function dictionaryReducer(state = null, action) {
  switch (action.type) {
    case 'LOADED_DICTIONARY_DATA':
      return action.data;

    default:
      return state
  }
}
export default dictionaryReducer;
