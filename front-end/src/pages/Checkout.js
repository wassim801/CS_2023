import React,{useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch,useSelector } from "react-redux";
import { emtyCart, getCart } from "../features/cart/cartSlice";
import StripePaymentForm from "../components/stripElemets";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as yup from "yup";
import { Field,useFormik ,Formik} from "formik";
import { addAddress, resetCustomerAdr } from "../features/cutomers/customerSlice";
import { toast } from 'react-toastify';
import { Toast } from "react-bootstrap";

const stripePromise = loadStripe('pk_test_51MyR6bEwhrtauCNk4Wnvls8pwtozplGPNUA1jLKYdDuA9Xgr9C9YbODiBDXPMd13sTsbjSEzBMGCIzxfm07vupZB00H8HKrg22');
let schema = yup.object().shape({
  country: yup.string().required("country is Required"),
  firsName: yup.string().required("firsName is Required"),
  lastName: yup.string().required("lastName is Required"),
  address: yup.string().required("address is Required"),
  appartment: yup.string().required("appartment is Required"),
  city: yup.string().required("city is Required"),
  state: yup.string().required("state is Required"),
  zipcode: yup.string().required("Quantity is Required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data,setData]= useState(false)
  const cartState = useSelector((state)=>state.cart.cart)
  const addressAdded = useSelector((state)=> state.customer.customerAdr)
  const orderState = useSelector((state)=>state.order.isSuccess)
  useEffect(() => {
    let interval;
    if(orderState){
      dispatch(emtyCart())
     interval = setInterval(() => {
      toast.success('Order placed successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          // Change the path here
          navigate('/');
        },
      });
    }, 3000);}

    return () => {
      clearInterval(interval);
    };
  }, [navigate,orderState]);
  useEffect(()=>{
    if(addressAdded){
      setData(true)
    }

  },[addressAdded])
  useEffect(()=>{
    dispatch(getCart())
  },[])
  console.log(cartState)
 
   const formik = useFormik({
    initialValues: {
      country: "",
      firsName: "",
      lastName: "",
      address: "",
      appartment: "",
      city: "",
      state: "",
      zipcode: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addAddress(values));
      formik.resetForm();
      
    
    },
  });
  const returnAddressInfo = ()=>{
    setData(false)
  }
  console.log(data)
    if(data){
      return(
      <>
      <Toast/>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h3 className="website-name">WLA</h3>
                  <nav
                    style={{ "--bs-breadcrumb-divider": ">" }}
                    aria-label="breadcrumb"
                  >
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link className="text-dark total-price" to="/cart">
                          Cart
                        </Link>
                      </li>
                      &nbsp; /&nbsp;
                      <li
                        className="breadcrumb-ite total-price active"
                        aria-current="page"
                      >
                        Information
                      </li>
                      &nbsp; /
                      <li className="breadcrumb-item total-price active">
                        Shipping
                      </li>
                      &nbsp; /
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Payment
                      </li>
                    </ol>
                  </nav>
                  <h4 className="title total">Contact Information</h4>
                  <p className="user-details total">
                    Wassim Nasr (wassimna68@gmail.com)
                  </p>
                  <h4 className="mb-3">Continue to Payment </h4>
                  <button  className="button" onClick={returnAddressInfo}>
                          Address Information
                        </button>
                  <Elements stripe={stripePromise}>
          <StripePaymentForm amount={cartState.cartTotal*100}  />
         </Elements>
        
                </div>
              </div>
              <div className="col-5"> 
              {cartState?.products?.map((product)=>(
                <div className="border-bottom py-4">
                  <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {product.count}
                        </span>
                        <img className="img-fluid" src={product.product.images[0].url} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{product.product.title}</h5>
                        <p className="total-price">$ / {product.price}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">$ {product.count*product.price}</h5>
                    </div>
                  </div>
                </div>
               
    
              ))}
               <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Subtotal</p>
                    <p className="total-price">$ {cartState.cartTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">$ 10000</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                  <h4 className="total">Total</h4>
                  <h5 className="total-price">$ {cartState.cartTotal}</h5>
                </div>
              </div>
              
            </div>
          </Container>
         
    
         
         </>
      )
    }
    else
    {
      return (
        <>
    
          <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-7">
                <div className="checkout-left-data">
                  <h3 className="website-name">WLA</h3>
                  <nav
                    style={{ "--bs-breadcrumb-divider": ">" }}
                    aria-label="breadcrumb"
                  >
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link className="text-dark total-price" to="/cart">
                          Cart
                        </Link>
                      </li>
                      &nbsp; /&nbsp;
                      <li
                        className="breadcrumb-ite total-price active"
                        aria-current="page"
                      >
                        Information
                      </li>
                      &nbsp; /
                      <li className="breadcrumb-item total-price active">
                        Shipping
                      </li>
                      &nbsp; /
                      <li
                        className="breadcrumb-item total-price active"
                        aria-current="page"
                      >
                        Payment
                      </li>
                    </ol>
                  </nav>
                  <h4 className="title total">Contact Information</h4>
                  <p className="user-details total">
                    Wassim Nasr (wassimna68@gmail.com)
                  </p>
                  <h4 className="mb-3">Shipping Address</h4>
                  <Formik {...formik}>
                  <form
                  onSubmit={formik.handleSubmit}
                    className="d-flex gap-15 flex-wrap justify-content-between"
                  >
                    <div className="w-100">
                    <Field 
                     as="select"
                     name="country"
                     {...formik.getFieldProps("country")}

                     className="form-control form-select"
                     onChng={formik.handleChange("country")}
                     onBlr={formik.handleBlur("country")}
                     value={formik.values.country}>
                        <option value="" selected disabled >
                          Select Country
                        </option>
                        <option value="united_states">United States</option>
                        <option value="india">India</option>
                        <option value="china">China</option>
                        <option value="japan">Japan</option>
                        <option value="germany">Germany</option>
                        <option value="united_kingdom">United Kingdom</option>
                        <option value="france">France</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="brazil">Brazil</option>
                        <option value="mexico">Mexico</option>
                        <option value="south_korea">South Korea</option>
                        <option value="russia">Russia</option>
                        <option value="south_africa">South Africa</option>
                        <option value="nigeria">Nigeria</option>
                        <option value="egypt">Egypt</option>
                        <option value="indonesia">Indonesia</option>
                        <option value="turkey">Turkey</option>
                        <option value="argentina">Argentina</option>
                        <option value="italy">Italy</option>
                      </Field>
                      <div className="error">
            {formik.touched.country && formik.errors.country}
          </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                        name="firsName"
                        onChange={formik.handleChange("firsName")}
                        onBlur={formik.handleBlur("firsName")}
                        value={formik.values.firsName}
                      />
                      <div className="error">
                      {formik.touched.firsName && formik.errors.firsName}
                   </div>
                    </div>
                    
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                        name="lastName"
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                        value={formik.values.lastName}
                      />
                      <div className="error">
                      {formik.touched.lastName && formik.errors.lastName}
                   </div>
                    </div>
                    
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Address"
                        className="form-control"
                        name="address"
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        value={formik.values.address}
                      />
                      <div className="error">
                      {formik.touched.address && formik.errors.address}
                   </div>
                    </div>
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Apartment, Suite ,etc"
                        className="form-control"
                         name="appartment"
                         onChange={formik.handleChange("appartment")}
                        onBlur={formik.handleBlur("appartment")}
                        value={formik.values.appartment}
                      />
                      <div className="error">
                      {formik.touched.appartment && formik.errors.appartment}
                   </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="City"
                        className="form-control"
                        name="city"
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                        value={formik.values.city}
                      />
                      <div className="error">
                      {formik.touched.city && formik.errors.city}
                   </div>
                    </div>
                    <div className="flex-grow-1">
                    <Field 
                     as="select"
                     name="state"
                     {...formik.getFieldProps("state")}

                     className="form-control form-select"
                       onChange={formik.handleChange("state")}
                       onBlur={formik.handleBlur("state")}
                       value={formik.values.state}
                      >
                        <option value="" selected disabled>
                          Select State
                        </option>
                        <option value="turkey">Turkey</option>
                        <option value="argentina">Argentina</option>
                        <option value="italy">Italy</option>
                      </Field>
                      <div className="error">
                      {formik.touched.state && formik.errors.state}
                   </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="Zipcode"
                        className="form-control"
                        name="zipcode"
                        onChange={formik.handleChange("zipcode")}
                        onBlur={formik.handleBlur("zipcode")}
                        value={formik.values.zipcode}
                      />
                      <div className="error">
                      {formik.touched.zipcode && formik.errors.zipcode}
                   </div>
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/cart" className="text-dark">
                          <BiArrowBack className="me-2" />
                          Return to Cart
                        </Link>
                        <button type="submit"  className="button" >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  </form>
                  </Formik>
                </div>
              </div>
              <div className="col-5"> 
              {cartState?.products?.map((product)=>(
                <div className="border-bottom py-4">
                  <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {product.count}
                        </span>
                        <img className="img-fluid" src={product.product.images[0].url} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{product.product.title}</h5>
                        <p className="total-price">$ / {product.price}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">$ {product.count*product.price}</h5>
                    </div>
                  </div>
                </div>
               
    
              ))}
               <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Subtotal</p>
                    <p className="total-price">$ {cartState.cartTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">$ 10000</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                  <h4 className="total">Total</h4>
                  <h5 className="total-price">$ {cartState.cartTotal}</h5>
                </div>
              </div>
              
            </div>
          </Container>
         
    
        </>
      );
    }
  
  
};

export default Checkout;
