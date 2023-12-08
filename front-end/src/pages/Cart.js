import React,{useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch,useSelector } from "react-redux";
import { getCart, removeProductFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state)=>state.cart.cart)
  const updateCart = useSelector((state)=> state.cart.updateCart)
  const currentUser = localStorage.getItem("user")

  console.log(cartState)
  useEffect(()=>{
    dispatch(getCart())
  },[updateCart])
  const removeProduct = (id) =>{
    dispatch(removeProductFromCart(id))
    console.log(id)

  }
  if (!currentUser) {
    return (
      <div style={{height:"150px",position:"relative",top:"30px"}} >
        <h2 style={{textAlign:"center"}}>You are not logged in. <Link className="text-dark" to={"/login"}> Please log in to view your wishlist.</Link></h2>
        {/* Render login component or login link here */}
      </div>
    );
  }
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
      <div className="row">
      {cartState?.products?.map((product)=>(
        <div className="col-12">
        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
          <h4 className="cart-col-1">Product</h4>
          <h4 className="cart-col-2">Price</h4>
          <h4 className="cart-col-3">Quantity</h4>
          <h4 className="cart-col-4">Total</h4>
        </div>
        <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <div className="w-25">
              <Link to={`/product/${product?.product?._id}`}>
              <img src={  product.product.images && product.product.images.length > 0
                      ? product.product.images[0].url
                      : 'hhh.jpg'} className="img-fluid" alt="product image" />
                      </Link>
            </div>
            <div className="w-75">
              <p>{product.product.title}</p>
              <p>Size: hgf</p>
              <p>Color: {product.color}</p>
            </div>
          </div>
          <div className="cart-col-2">
            <h5 className="price">$ {product.price}</h5>
          </div>
          <div className="cart-col-3 d-flex align-items-center gap-15">
            <div>
              <input
                className="form-control"
                type="number"
                name=""
                value={product.count}
                min={1}
                max={10}
                id=""
              />
            </div>
            <div>
              <AiFillDelete style={{ cursor: 'pointer' }} className="text-danger " onClick={()=> removeProduct(product?.product?._id)}/>
            </div>
          </div>
          <div className="cart-col-4">
            <h5 className="price">$ {product.count*product.price}</h5>
          </div>
        </div>
      </div>
    
      ))}
        
      
      
        
          
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ {cartState?.cartTotal}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
