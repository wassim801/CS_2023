import axios from "axios";  
import { config } from "../../utils/axiosconfig";
import { authAxios } from "../../utils/axiosconfig";

import { base_url } from "../../utils/baseUrl";
import { useParams } from "react-router-dom";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data)
  return response.data;
};
const logout = async()=>{
  const reponse = await authAxios.put(`${base_url}user/logout`);

  localStorage.removeItem("user")
  return reponse.data 
}
const signup = async (user) =>{
  const reponse = await axios.post(`${base_url}user/register`, user);
 if(reponse.data){
  localStorage.setItem("token", JSON.stringify(reponse.data));
 }
  return reponse.data

};
const verify = async(token)=>{
  const reponse = await axios.get(`${base_url}user/verify/${token}`);
  console.log(reponse.data)
  if(reponse.data){
    localStorage.setItem("user", JSON.stringify(reponse.data));
  }
  return reponse.data
}
const getOrders = async () => {
  const response = await authAxios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await authAxios.post(
    `${base_url}user/getorderbyuser`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  signup,
  verify,
  logout
};

export default authService;
