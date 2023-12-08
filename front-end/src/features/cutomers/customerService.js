import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { authAxios } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};
const getUser = async (id) => {
  const response = await authAxios.get(
    `${base_url}user/${id}`,
    "",
    
  );
 
  
  return response.data;

  }
  const addAddress = async (adress) => {
    const response = await authAxios.put(
      `${base_url}user/save-address`,adress
      
      
    );
    return response.data;

  }
const customerService = {
  getUsers,
  getUser,
  addAddress
};

export default customerService;
