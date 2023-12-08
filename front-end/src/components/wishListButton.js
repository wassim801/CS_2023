import { useState, useEffect } from 'react';
import wish from "../images/wish.svg";
import wishRed from "../images/b51e8dbebd4ba8a8f342190a4b9f08d7.svg"
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getWishlist } from '../features/wishlist/wishlistSlice';

function WishlistButton({ product }) {
  const [isWished, setIsWished] = useState(false);
  const wishListState = useSelector((state) => state.wishlist.wishlist);
  const currentUser = useSelector((state)=>state.auth.user)
  const dispatch = useDispatch();
  console.log(currentUser)

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  useEffect(() => {
    setIsWished(
      wishListState?.wishlist?.findIndex((productwishlist) => productwishlist._id === product._id) !== -1
    );
  }, [wishListState,product._id]);

  useEffect(()=>{
    if(!currentUser){
      setIsWished(false)
    }
    console.log(currentUser)


  },[])
  const handleClick = () => {
    
   
   

    
      dispatch(addToWishlist(product?._id));
        setIsWished(isWished)

    
  };

  return (
    <button className="border-0 bg-transparent" onClick={handleClick}>
      <img src={isWished ? wishRed : wish} alt="wishlist" />
    </button>
  );
}

export default WishlistButton;
