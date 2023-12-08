import React,{useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError]= useState('')
  const formik = useFormik({
    
    initialValues: {
      email: "",
      password: "",
    },
    handleBlur:false,
    handleChange:false,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    } else if(isError) {
      setError('Email or Password Invalid')
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <p style={{color:"red"}}>{error}</p>
              <form action="" className="d-flex flex-column gap-15"  onSubmit={formik.handleSubmit}>
                <CustomInput type="email" name="Email" placeholder="Email"id="email"label="email"
                  onChng={formik.handleChange("email")}
                  onBlr={formik.handleBlur("email")}
                  val={formik.values.email}/>
                <div className="error mt-2">
               {formik.touched.email && formik.errors.email}
          </div>  
                <CustomInput
                  type="password"
                  name="Password"
                  placeholder="Password"
                  label="password"
                  id="password"
                  onChng={formik.handleChange("password")}
                  onBlr={formik.handleBlur("password")}
                  val={formik.values.password}
                />
                <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
