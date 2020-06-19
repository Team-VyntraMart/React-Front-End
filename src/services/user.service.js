import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'product/getAll');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  
  findProductById(pId) {
	  return axios.get(API_URL + 'product/' + pId);
  }
  
  addProduct(name, price, image) {
	return axios.post(API_URL + "admin/addProduct", {name, price, image},{ headers: authHeader() });
  }
  
  deleteProduct(pId) {
	  return axios.delete(API_URL + "admin/deleteProduct/" + pId,{ headers: authHeader() });
  }
  
  updateProduct(pId, name, price, image) {
		return axios.put(API_URL + "admin/updateProduct/" + pId, {name, price, image},{ headers: authHeader() });
  }
  
  addProductToCart(selectedProducts,user_id) {
	  return axios.post(API_URL + "user/addtocart", {selectedProducts,user_id},{ headers: authHeader() });
  }
}

export default new UserService();