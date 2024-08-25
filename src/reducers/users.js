import { Types } from "../actions/users";

const INITIAL_STATE = {
  items: [],
  error: "",
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      console.log(action.payload.items);
      return {
        items: action.payload.items,
      };
    }

    case Types.CREATE_USER_REQUEST: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case Types.DELETE_USER_REQUEST: {
      const updatedItems = state.items.filter(
        (user) => user.id !== action.payload.userId
      );
      return {
        ...state,
        items: updatedItems,
      };
    }

    case Types.USERS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
