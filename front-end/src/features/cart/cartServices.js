import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { authAxios } from "../../utils/axiosconfig";

const addCart = async (cart) => {
  const response = await authAxios.post(`${base_url}user/cart`,{cart})
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
  const emtyCart = async (productId)=>{
    const response = await authAxios.delete(
      `${base_url}user/empty-cart`
      )
      console.log(response.data)
      return response.data;
    
  }
const cartService = {
  addCart,
  geCart,
  removeProductCart,
  emtyCart
};

export default cartService;
