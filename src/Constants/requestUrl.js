const REQUEST_URL = {
  LOGIN_SUCCESS:
    'http://localhost:4000/api/auth/google/login/success',
  LOGOUT: 'http://localhost:4000/api/auth/google/logout',
  POST_SEARCH_RESULT_FOR_VIDEO: 'http://localhost:4000/api/videos',
  GET_VIDEO_SUCCESS:
  'http://localhost:4000/api/videos/success',
  POST_SEARCH_RESULT_FOR_DICTIONARY: 'http://localhost:4000/api/dictionary',
  GET_DICTIONARY_SUCCESS: 'http://localhost:4000/api/dictionary/success',
  POST_ADDED_WORD: 'http://localhost:4000/api/myWords',
  DELETE_WORD: 'http://localhost:4000/api/myWords'
};

export default REQUEST_URL;
