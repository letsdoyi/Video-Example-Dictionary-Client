import CONSTANTS from '../Constants/common';
import actionTypes from '../Constants/actionTypes';

const {
  TYPED_WORD,
  CHECKED_LANGUAGE,
  CHECKED_CATEGORY,
} = actionTypes;
const { SELECTION } = CONSTANTS;
const initialState = {
  language: 'en',
  categories: [],
};

export function selectedReducer(state = initialState, action) {
  switch (action.type) {
    case TYPED_WORD:
      return {
        ...state,
        word: action.data,
      };
    case CHECKED_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };

    case CHECKED_CATEGORY:
      const isIncluded = state.categories.includes(action.data);
      const index = state.categories.indexOf(action.data);

      if (isIncluded) {
        state.categories.splice(index, 1);
      } else if (state.categories.length < SELECTION.LIMIT) {
        state.categories.push(action.data);
      }
      return { ...state };

    default:
      return state;
  }
}

export default selectedReducer;
