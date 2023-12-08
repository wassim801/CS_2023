import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { authAxios } from "../../utils/axiosconfig";

const getColorList = async (id) => {
    console.log(id)

  const response = await authAxios.get(
    `${base_url}product/colorlist`, {
        params: { id }
      }    
    
  ); 

  
  return response.data;

  }
  const getAllColor = async () => {

  const response = await authAxios.get(
    `${base_url}color`, {
        
      }    
    
  ); 

  
  return response.data;

  }
const colorServices = {
  getColorList,
  getAllColor
  
};

export default colorServices;
