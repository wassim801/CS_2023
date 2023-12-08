import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { authAxios } from "../../utils/axiosconfig";

const addOrder = async (amount) => {
  const response = await authAxios.post(`${base_url}user/order/cash-order`,{amount})
  console.log(response.data)

  return response.data;
};
const geCart = async () => {
  const response = await authAxios.get(
    `${base_url}user/cart`,
    
  );

 
  console.log(response.data)
  return response.data;

  }
  const removeProductCart = async (productId)=>{
    const response = await authAxios.put(
      `${base_url}user/cart/${productId}`
      )
      console.log(response.data)
      return response.data;
    
  }
  const getOrders = async () => {
    const response = await authAxios.post(`${base_url}user/get-orders`)
    console.log(response.data)
  
    return response.data;
  };

const orderServices = {

  addOrder,
  getOrders,
  
};

export default orderServices;
