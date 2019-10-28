import actionTypes from '../Constants/actionTypes';

const initialState = {
  foundWord: null,
  info: []
};
const {
  LOADED_VIDEO_DATA,
} = actionTypes;

function videosReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_VIDEO_DATA:
      return action.data;

    default:
      return {
        ...state,
      };
  }
}

export default videosReducer;
