// Initial state
const initialState = {
  account: ""
};

// Actions
const SET_USER = "AuthState/SET_USER";

// Action creators
export function setAuthUser(payload) {
  return dispatch =>
    dispatch({
      type: SET_USER,
      payload: payload
    });
}
// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      state.account = action.payload;
      return state;
    default:
      return state;
  }
}
