import { reducer as reduxFormReducer } from "redux-form";
import auth, * as fromAuth from "./auth";
import exercise from "./student_exercise";

export default {
  auth: auth,
  form: reduxFormReducer,
  exercise: exercise
};

export const isAuthenticated = (state, role) =>
  fromAuth.isAuthenticated(state.auth, role);
export const accessToken = state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired = state =>
  fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired = state =>
  fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);
