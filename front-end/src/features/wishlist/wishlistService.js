import axios from "axios";
import { authAxios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const addToWishlist = async (prodId) => {
  console.log(prodId)
    const response = await authAxios.put(
      `${base_url}product/wishlist`,{prodId}
      
    );
   
    
    return response.data;
  
    }

    const getWishlist = async () => {
        const response = await authAxios.get(
          `${base_url}user/wishlist`,
          
        );
       
        
        return response.data;
      
        }
  const wishlistService = {
    addToWishlist,
    getWishlist
    
  };
  
  export default wishlistService;