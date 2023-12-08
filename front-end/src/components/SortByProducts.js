import React ,{ useState,useEffect }from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Spinner} from 'react-bootstrap';

import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishRed from "../images/b51e8dbebd4ba8a8f342190a4b9f08d7.svg"
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { getProducts, sortByProduct } from "../features/product/productSlice";
import { addToWishlist, getWishlist } from "../features/wishlist/wishlistSlice";
import WishlistButton from "./wishListButton";
const SortByProducts = (props) => {
  const { grid } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.sortByproducts);

  useEffect(() => {
    dispatch(sortByProduct(props.tags));
  }, [props.tags]);
  const isLoading = useSelector((state)=> state.product.isLoading)
  const wishListState = useSelector((state)=>state.wishlist.wishlist)
  useEffect(() => {
    dispatch(getWishlist());
  }, []);
  console.log(wishListState)
  const [data1, setData1] = useState([]);

  console.log(data1)
  const addtoWishlist = (id) =>{
    dispatch(addToWishlist(id))
    console.log(id)

  }
  console.log(productState)



  return (
    <>
    {isLoading && !productState ?  <div >
         <Spinner animation="border" role="status" style={{marginLeft:"50%"}}></Spinner>
         </div>: productState?.map((product) => (
      <div
        className={` ${ 
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <div
          
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">

           
          <WishlistButton product={product} />

          
          </div>
          <Link className="product-image"to={`/product/${product._id}`}>
            <img src={product.images[0].url} className="img-fluid" alt="product image"style={{ borderRadius: "10%" }} />
            <img src={watch2} className="img-fluid" alt="product image" />
          </Link>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              {product.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={product.totalrating}
              edit={true}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
     
      </div>
        ))}
   
    </>
  );
};

export default SortByProducts;
