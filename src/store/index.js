import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux";
import thunk from "redux-thunk";

import authReducer from "../redux/authReducer";
// const store = createStore(authReducer, applyMiddleware(thunk));
const store = createStore(authReducer);

export default store;
