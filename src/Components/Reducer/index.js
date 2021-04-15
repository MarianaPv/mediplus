import { combineReducers } from "redux";
import userReducer from "./userReducer";

const allReducer = combineReducers({
  userInfo: userReducer,
});

export default allReducer;
