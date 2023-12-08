import React ,{useEffect,useState}from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../features/cutomers/customerSlice";
import { addToWishlist, getWishlist } from "../features/wishlist/wishlistSlice";
import {Spinner} from 'react-bootstrap';

const Wishlist = () => {
  const dispatch = useDispatch()
  const LoadingState = useSelector((state)=>state.wishlist.isLoading)
  const userWishlist = useSelector((state)=>state.wishlist.wishlist)
 const addWishList = useSelector((state)=> state.wishlist.addWishlist)
  const currentUser = localStorage.getItem("user")

 
  console.log(userWishlist.wishlist)
  useEffect(()=>{
    dispatch(getWishlist())
  },[addWishList])
  if (!currentUser) {
    return (
      <div style={{height:"150px",position:"relative",top:"30px"}} >
        <h2 style={{textAlign:"center"}}>You are not logged in. <Link className="text-dark" to={"/login"}> Please log in to view your wishlist.</Link></h2>
        {/* Render login component or login link here */}
      </div>
    );
  }
  const addtoWishlist = (id) =>{
    dispatch(addToWishlist(id))
    console.log(id)

  }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        {LoadingState ?
        <div >
         <Spinner animation="border" role="status" style={{marginLeft:"50%"}}></Spinner>
         </div>:
         <div className="row">

          {userWishlist?.wishlist?.map((product) => ( 
                          

            <div className="col-md-3" key={product._id}>
              <div className="wishlist-card position-relative">
              

                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  onClick={() => addtoWishlist(product._id)}
                />
                <Link className="product-image"to={`/product/${product?._id}`}>
                <div className="wishlist-card-image">
                  <img
                    src={product?.images[0]?.url}
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                </Link>
                <div className="py-3 px-3">
                  <h5 className="title">
                    {product.title}
                  </h5>
                  <h6 className="price">$ {product.price}</h6>
                </div>
              </div>

            </div>
          ))}
          
        </div>
         }
        
      </Container>
    </>
  );
  
};

export default Wishlist;
