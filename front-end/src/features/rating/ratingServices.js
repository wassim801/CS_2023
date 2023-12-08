import axios from "axios";
import { authAxios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const addRating = async (product) => {
  const response = await authAxios.put(`${base_url}product/rating`, product);
console.log(response.data)
  return response.data;
};

const ratingServices = {
  addRating
};

export default ratingServices;
