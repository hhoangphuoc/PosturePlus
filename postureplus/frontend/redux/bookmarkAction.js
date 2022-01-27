export const ACTIONS = {
  ADD_TO_WISHLIST: "add_to_wishlist",
  REMOVE_FROM_WISHLIST: "remove_from_wishlist",
  ON_ERROR: "on_error",
};

export const addToWishList = (exercise) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.ADD_TO_WISHLIST,
      payload: exercise,
    });
  };
};
export const removeFromWishList = (exercise) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_WISHLIST,
      payload: exercise,
    });
  };
};
