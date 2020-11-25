import { GET_USER, USER_LOGOUT} from '../actions/types';

const initialState = {
  user: {},
  message:''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        message:'You have got user info..'

      };
      case USER_LOGOUT:
        return {
          ...state,
          user: action.payload,
          message:'You have logged out..'
        };
    default:
      return state;
  }
}