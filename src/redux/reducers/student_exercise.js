import * as ex from "../actions/student";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ex.EXERCISE_REQUEST:
      return { loading: true };
    case ex.EXERCISE_EXIST:
      return { loading: false, id: action.meta, name: action.payload.name };
    case ex.EXERCISE_NOT_EXIST:
      return { loading: false, error: true };
    default:
      return state;
  }
};
