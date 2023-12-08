import React, { useState,useEffect,useRef } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, resetState, updateProduct } from "../features/product/productSlice";
import { useFormik } from "formik";
import ImageMagnify from 'react-image-magnify';
import { getUsers } from "../features/cutomers/customerSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { getColorList } from "../features/color/colorSlice";
import { addRating } from "../features/rating/ratingSlice";
import { addCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import WishlistButton from "../components/wishListButton"



const SingleProduct = () => {


  const [orderedProduct, setorderedProduct] = useState(true);
  const params = useParams();
console.log(params.id)
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};
  const handleContinueShopping = () => {
    closeModal();

    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.classList.remove("show"); // Remove the "show" class from the modal backdrop element
      backdrop.style.display = "none";

    } 
  };
  const dispatch = useDispatch();
  const updateproduct = useSelector((state) => state.product.isUpdated);
  const productState = useSelector((state) => state.product.product);
  const ratingState = useSelector((state)=> state.rating.product)
  console.log(ratingState)
  const [numReviewsToShow, setNumReviewsToShow] = useState(5);
  const[totalRating,setTotalRating]= useState(productState.totalrating)
  const [quantity, setQuantity] = useState(1); // initial value set to 1
  const userLoggedIn = localStorage.getItem("user")
  const [showModal, setShowModal] = useState(false); // Add state to control modal visibility
  const [submitError,setSubmitError]= useState("")





console.log(totalRating)
  useEffect(() => {
      dispatch(getProduct(params.id));
   
  }, [params.id,ratingState]);
  const [rating,setRating]=useState([]);
  
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  

  const customerstate = useSelector((state) => state.customer.customers);


useEffect(()=>{
  dispatch(getColorList(params.id))
},[])
const ColorListState = useSelector((state)=>state.color.colorList)
console.log(ColorListState)
useEffect(()=>{
setRating(productState?.ratings)
},[productState])
console.log(rating)
console.log(productState?.ratings)
  const defaultImageProps = {
    width: 594,
    height: 600,
    zoomWidth: 600
  };
  const imageProps = {
    img: productState.images && productState.images.length > 0 ? productState.images[0].url : "hhh.jpg",
    zoomWidth: 600
        
  };
  
  const mergedProps = Object.assign({}, defaultImageProps, imageProps);
  const image = {
    small: '',
    large: '',
  };
  
  const ratings = [];
  console.log(showModal)
  const reversedRating = [];
  for (let i = rating?.length - 1; i >= 0; i--) {
    reversedRating.push(rating[i]);
  }

  const currentUser = useSelector((state)=>state.auth.user)
  const formik = useFormik({
    initialValues: {
      rating: 4,
       comment: "",
       
    },
    onSubmit: (values) => {
      if(!userLoggedIn){
        setSubmitError("You should to Log In before you submit a review")

      }else{
      dispatch(addRating(ratings));
      formik.resetForm();
      formik.values.rating=4;

      console.log(values.rating); 

      setTimeout(() => {
      }, 3000);
    }
  }
  });
  
  
    ratings.push({
      star: formik.values.rating,
      comment: formik.values.comment,
      prodId: params.id,
 
  });
  const handleRatingChange = (newRating) => {
    formik.setFieldValue("rating", newRating);
  };
  const addtoWishlist = (id) =>{
    if(!userLoggedIn){
      toast.error( <div>
        Not authorized. Please <Link to="/login">login</Link>.
      </div>, {
        position: toast.POSITION.TOP_CENTER, // Set the position of the toast message
        autoClose: 3000, // Set the duration for which the toast message will be displayed (in milliseconds)
      });}
    else{
    dispatch(addToWishlist(id))
    console.log(id)
    }
  }
  const [cart,setCart] = useState({ 
    _id : params.id,
    count : quantity,
    color:"blue"});
  

  const addToCart = (cart) =>{
    if(!userLoggedIn){
      toast.error( <div>
        Not authorized. Please <Link to="/login">login</Link>.
      </div>, {
        position: toast.POSITION.TOP_CENTER, // Set the position of the toast message
        autoClose: 3000, // Set the duration for which the toast message will be displayed (in milliseconds)
      });
    }else{
    dispatch(addCart(cart))
    setShowModal(true);

    console.log(cart)}

  }
  const commentSectionRef = useRef(null);
  const modalRef = useRef();


  const scrollToCommentSection = () => {
    commentSectionRef.current.focus();
    }
    const handleLinkClick = () => {
      // Programmatically dismiss the modal
      modalRef.current.hide();

    };
  

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
              <ReactImageZoom {...mergedProps}
    />
              </div>
            </div>
            {/* <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div> */}
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">${productState.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating ? productState?.totalrating:0} 
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">({productState.ratings?.length} )</p>
                </div>
                <a className="review-btn"  onClick={scrollToCommentSection}>
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">Havells</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={1000}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      value={quantity}
                      onChange={(e) =>{ setQuantity(e.target.value);
                        setCart({
                          ...cart,
                          count: e.target.value
                        })}}
                     />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => addToCart(cart)}
                    >
                      Add to Cart
                    </button>
                    <ToastContainer /> 
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <Link to={"/compare-product"}>
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </Link>
                  </div>
                  <div>
                  <a >
                    <WishlistButton className="fs-5 me-2" product={productState} />Add to Wishlist
                     </a>
                    
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                {productState.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  
                  <div className="d-flex align-items-center gap-10">
                  
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating ? productState?.totalRating:0}
                      edit={false}
                      activeColor="#ffd700"
                    />
                   
                    
                    <p className="mb-0">Based on {productState.ratings?.length} Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      name="rating"
                      edit={true}
                      value={formik.values.rating}
                      onChange={handleRatingChange}

                      
                      activeColor="#ffd700"
                    />
                    {submitError.length>0 ? <div className="submit-error ">
                     <p className="text-danger">{submitError}.</p>
                   </div> :"" }
                    
                  </div>
                  
                  <div >
                    <textarea 
                     tabIndex={0} ref={commentSectionRef}
                      name="comment"
                      id="write_review"
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      onChange={formik.handleChange("comment")}
                      value={formik.values.comment}
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              {reversedRating?.slice(0, numReviewsToShow).map((i,j)=>{
                return(
                  <div className="reviews mt-4">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      
                      <h6 className="mb-0">
                      {customerstate
              .filter((user) => user._id === i.postedby)
              .map((user, index) => user.firstName)}
                        </h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={i?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                   {i.comment}
                    </p>
                  </div>
                  
                </div>)
              })}
             
   <div class="d-flex justify-content-center mt-4">
  <div class="btn-group" role="group" aria-label="Reviews">
    {rating?.length > numReviewsToShow && (
      <button class="button border-0 " onClick={() => setNumReviewsToShow(numReviewsToShow + 3)}>Show More</button>
    )}
    {rating?.length <= numReviewsToShow && (
      <button class="button border-0" onClick={() => setNumReviewsToShow(numReviewsToShow - (rating?.length))}>Show Less</button>
    )}
  </div>
</div>
            
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard tags="popular" grid={6}/>
        </div>
      </Container>

      <div
      ref={modalRef}
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="false"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden={showModal} // Set aria-hidden based on showModal state
        style={{ display: showModal ? 'block' : 'none' }}
       
      >
        <div className="modal-dialog modal-dialog-centered"id="myModal"
            style={{ display: showModal ? 'block' : 'none' }}
            //data-bs-dismiss={!showModal?"modal":""}
            //aria-label={showModal?"": "Close"}
            >
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={productState.images && productState.images.length > 0 ? productState.images[0].url : "hhh.jpg"} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: {productState.quantity}</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
               <Link to="/cart" className="button"  onClick={handleLinkClick}>
                View My Cart
                </Link> 
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">

              <Link
                className="text-dark"
                to="/"

                onClick={handleLinkClick}
               
              >
                Continue To Shopping
              </Link>
             
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
