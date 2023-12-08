import React,{useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { verifyEmail } from '../features/auth/authSlice';
function Verify({match}) {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state);
  const [msg,setMsg]=useState('')
  
  const { user,token, isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    dispatch(verifyEmail(token))
     
        if(isSuccess){
            setMsg(message)
        }
      
  }, [dispatch, token,isSuccess]);
  return (
    <div><h1>{msg}</h1></div>
  )
}

export default Verify