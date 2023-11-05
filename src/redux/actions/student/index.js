import { RSAA } from "redux-api-middleware";

export const LOGIN_REQUEST = "@@auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@@auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@@auth/LOGIN_FAILURE";
export const TOKEN_REQUEST = "@@auth/TOKEN_REQUEST";
export const TOKEN_RECEIVED = "@@auth/TOKEN_RECEIVED";
export const TOKEN_FAILURE = "@@auth/TOKEN_FAILURE";

export const EXERCISE_REQUEST = "@@exercise/EXERCISE_REQUEST";
export const EXERCISE_EXIST = "@@exercise/EXERCISE_EXIST";
export const EXERCISE_NOT_EXIST = "@@exercise/EXERCISE_NOT_EXIST";
export const login = auth => ({
  type: "LOG_IN",
  [RSAA]: {
    endpoint: "/api/student/auth/token/obtain/",
    method: "POST",
    body: JSON.stringify(auth),
    headers: { "Content-Type": "application/json" },
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
  }
});
export const refreshAccessToken = token => ({
  type: "TOKEN_REFRESH",
  [RSAA]: {
    endpoint: "/api/student/auth/token/refresh/",
    method: "POST",
    body: JSON.stringify({ refresh: token }),
    headers: { "Content-Type": "application/json" },
    types: [TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE]
  }
});

export const start = exerciseId => ({
  type: "START_EXERCISE",
  [RSAA]: {
    endpoint: `/api/student/get-exercise-name?exercise=${exerciseId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    options: { timeout: 3000 },
    types: [
      EXERCISE_REQUEST,
      {
        type: EXERCISE_EXIST,
        meta: exerciseId
      },
      EXERCISE_NOT_EXIST
    ]
  }
});
