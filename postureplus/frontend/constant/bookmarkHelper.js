import { useSelector, useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/bookmarkAction";

export const wishlist = useSelector((state) => state.bookmarkReducer.wishlist);

const bookmarkHelper = () => {
  const dispatch = useDispatch();

  const onTapAddToWishList = (exercise) => {
    console.log("adding to wishlist");
    dispatch(addToWishList(exercise));
  };

  const onTapRemoveFromWishList = (exercise) => {
    console.log("removing from wishlist");
    if (wishlist.filter((item) => item.id === exercise.id).length > 0) {
      dispatch(removeFromWishList(exercise));
    }
  };

  const isExist = (exercise) => {
    if (wishlist.filter((item) => item.id === exercise.id).length > 0) {
      return true;
    }
    return false;
  };
};
export default {
  bookmarkHelper,
  onTapRemoveFromWishList,
  onTapAddToWishList,
  isExist,
};
