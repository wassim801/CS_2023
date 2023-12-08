import React,{useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signup} from "../features/auth/authSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckEmail from "./CheckEmail";
let schema = yup.object().shape({
  firstName: yup
    .string()
    .required("first Name is Required"),
    lastName: yup
    .string()
    .required("last name is Required"),
    email : yup
    .string()
    .email("should be a valid email")
    .required("email required"),
    mobile : yup
    .number("mobile should be a number")
    .required("mobile required"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    
    initialValues: {
      firstName: "",
      lastName: "",
      email:"",
      mobile:"",
      password:"",
      confirmPassword:""
    },
    handleBlur:false,
    handleChange:false,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(signup(values));
    },
  });
  const handleSignUpSuccess = () => {
    toast.success('accout created succsefull', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSignUploading = () => {
    toast.info('accout generated', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isLoading) {
      handleSignUploading();

    } 
    else if (isSuccess) {  
      handleSignUpSuccess();
      navigate('/check')

    }
     else {
      navigate("/signup");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="firsName" name="firstName" placeholder="firstName"
                onChng={formik.handleChange("firstName")}
                onBlr={formik.handleBlur("firstName")} />
                <div className="error mt-2">
                {formik.touched.firstName && formik.errors.firstName}
                </div>
                <CustomInput type="text" label="lastName" name="lastName" placeholder="lastName"
                onChng={formik.handleChange("lastName")}
                onBlr={formik.handleBlur("lastName")} />
                <div className="error mt-2">
                {formik.touched.lastName && formik.errors.lastName}
                </div>
                <CustomInput type="email"label="Email" name="email" placeholder="Email" 
                onChng={formik.handleChange("email")}
                onBlr={formik.handleBlur("email")}
                />
                <div className="error mt-2">
                {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  label="Mobile"
                  placeholder="Mobile Number"
                  onChng={formik.handleChange("mobile")}
                  onBlr={formik.handleBlur("mobile")}
                />
                <div className="error mt-2">
                {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  label="password"
                  placeholder="Password"
                  onChng={formik.handleChange("password")}
                  onBlr={formik.handleBlur("password")}

                />
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  label="confirmPassword"
                  placeholder="confirmPassword"
                  onChng={formik.handleChange("confirmPassword")}
                  onBlr={formik.handleBlur("confirmPassword")}
                />
                <div className="error mt-2">
                {formik.touched.confirmPassword && formik.errors.confirmPassword}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />

    </>
  );
};

export default Signup;
