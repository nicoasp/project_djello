import * as Actions from '../actions/loginActions';


const initialState = {
	isFetching: false,
	data: {
	  user: {},
	  error: ""
	},
  error: null
};

export function session(state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.LOGOUT_STATE:
      return {
        ...state,
        data: {
          user: {},
          error: ""
        }
      };
    default:
      return state;
  }
}