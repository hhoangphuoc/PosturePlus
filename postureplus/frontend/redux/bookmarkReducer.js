import { ACTIONS } from "./bookmarkAction";
import { dummydata } from "../constant";
const initialState = {
  // exercises: [],
  exercises: dummydata.exercises,
  wishlist: [],
  // users: [],
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    // case Action.GET_EXERCISES:
    //   return {
    //     ...state,
    //     exercises: action.payload,
    //   };
    case ACTIONS.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (exercise) => exercise.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default bookmarkReducer;
