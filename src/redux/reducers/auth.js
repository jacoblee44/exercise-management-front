import jwtDecode from "jwt-decode";
import * as auth from "../actions/auth";

const initialState = JSON.parse(localStorage.getItem("auth"));

export default (state = initialState, action) => {
  let nextState = state;
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      nextState = {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        role: action.payload.role,
        errors: {}
      };
      break;
    case auth.TOKEN_RECEIVED:
      nextState = {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        }
      };
      break;
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      nextState = {
        access: undefined,
        refresh: undefined,
        errors: (action.payload && action.payload.response) || {
          non_field_errors: action.payload.statusText
        }
      };
      break;
    case auth.LOG_OUT:
      nextState = {
        access: undefined,
        refresh: undefined,
        errors: undefined
      };
      break;
    default:
  }
  localStorage.setItem("auth", JSON.stringify(nextState));
  return nextState;
};

export function accessToken(state) {
  if (state && state.access) {
    return state.access.token;
  }
}

export function refreshToken(state) {
  if (state && state.refresh) {
    return state.refresh.token;
  }
}

export function isAccessTokenExpired(state) {
  if (state && state.access && state.access.exp) {
    return 1000 * state.access.exp - new Date().getTime() < 5000;
  }
  return true;
}
export function isRefreshTokenExpired(state) {
  if (state && state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - new Date().getTime() < 5000;
  }
  return true;
}
export function isAuthenticated(state, role) {
  if (state && state.role !== role) return false;
  return !isRefreshTokenExpired(state);
}
export function errors(state) {
  return state && state.errors;
}
