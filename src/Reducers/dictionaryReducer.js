import actionTypes from "../Constants/actionTypes";
const { LOADED_DICTIONARY_DATA, RESET_STATE_OF, DICTIONARY} = actionTypes;

export function dictionaryReducer(state = null, action) {
  switch (action.type) {
    case LOADED_DICTIONARY_DATA:
      return action.data;

    case `${RESET_STATE_OF}_${DICTIONARY}`:
        return null;

    default:
      return state;
  }
}
export default dictionaryReducer;
