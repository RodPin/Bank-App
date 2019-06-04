// Initial state
import produce from "immer";

const initialState = {
  userData: null
};

// Actions
const SET_USER = "AuthState/SET_USER";

// Action creators
export function setAuthUser(payload) {
  console.log("setAuthUser");
  console.log(payload);

  return dispatch =>
    dispatch({
      type: SET_USER,
      payload: payload
    });
}
// Reducer

export default produce((draft, action) => {
  switch (action.type) {
    case SET_USER:
      console.log("action.type");
      console.log(action.payload);
      draft.userData = "asdok";
      console.log(draft);
      console.log(draft.userData);
      return draft;
    default:
      return draft;
  }
}, initialState);
