import React, { Component } from "react";
import {Table,InputGroup,FormControl,Button,Image} from 'react-bootstrap';
import "../sass/style.scss";
import axios from 'axios';

import Header from "./Header";
import Products from "./Products";
import UserService from "../services/user.service";
import Counter from "./Counter";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	products: [],
    	cart: [],
    	totalItems: 0,
    	totalAmount: 0,
    	term: "",
    	category: "",
    	cartBounce: false,
    	quantity: 1,
    	modalActive: false,
    	taxTotal: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  componentDidMount() {
	  this.getProducts();
   }
  
  getProducts() {
	 /*let url =
	   "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
	    axios.get(url)*/
	  UserService.getPublicContent()
	  	.then(response => {
	      this.setState({
	        products: response.data
	      });
	  });
   }
  
// Search by Keyword
   handleSearch(event) {
     this.setState({ term: event.target.value });
   }
   // Mobile Search Reset
   handleMobileSearch() {
     this.setState({ term: "" });
   }
   // Filter by Category
   handleCategory(event) {
     this.setState({ category: event.target.value });
     console.log(this.state.category);
   }
   // Add to Cart
   handleAddToCart(selectedProducts) {
     let cartItem = this.state.cart;
     let productID = selectedProducts.id;
     let productQty = selectedProducts.quantity;
     if (this.checkProduct(productID)) {
       console.log("hi");
       let index = cartItem.findIndex(x => x.id == productID);
       cartItem[index].quantity =
         Number(cartItem[index].quantity) + Number(productQty);
       this.setState({
         cart: cartItem
       });
     } else {
       cartItem.push(selectedProducts);
     }
     this.setState({
       cart: cartItem,
       cartBounce: true
     });
     setTimeout(
       function() {
         this.setState({
           cartBounce: false,
           quantity: 1
         });
         console.log(this.state.quantity);
         console.log(this.state.cart);
       }.bind(this),
       1000
     );
     this.sumTotalItems(this.state.cart);
     this.sumTotalAmount(this.state.cart);
   }
   handleRemoveProduct(id, e) {
     let cart = this.state.cart;
     let index = cart.findIndex(x => x.id == id);
     cart.splice(index, 1);
     this.setState({
       cart: cart
     });
     this.sumTotalItems(this.state.cart);
     this.sumTotalAmount(this.state.cart);
     e.preventDefault();
   }
   checkProduct(productID) {
     let cart = this.state.cart;
     return cart.some(function(item) {
       return item.id === productID;
     });
   }
   sumTotalItems() {
     let total = 0;
     let cart = this.state.cart;
     total = cart.length;
     this.setState({
       totalItems: total
     });
   }
   sumTotalAmount() {
     let total = 0;
     let cart = this.state.cart;
     for (var i = 0; i < cart.length; i++) {
       total += cart[i].price * parseInt(cart[i].quantity);
     }
     this.setState({
       totalAmount: total,
       taxTotal: 1.05 * total
     });
   }

   //Reset Quantity
   updateQuantity(qty) {
     console.log("quantity added...");
     this.setState({
       quantity: qty
     });
   }
   // Open Modal
   openModal(product) {
     this.setState({
       quickViewProduct: product,
       modalActive: true
     });
   }
   // Close Modal
   closeModal() {
     this.setState({
       modalActive: false
     });
   }

  render() {
	  
	  
	  
    return (
      
    <div className="container">
	  <Header
	    cartBounce={this.state.cartBounce}
	    total={this.state.totalAmount}
	    totalItems={this.state.totalItems}
	    taxTotal={this.state.taxTotal}
	    cartItems={this.state.cart}
	    removeProduct={this.handleRemoveProduct}
	    handleSearch={this.handleSearch}
	    handleMobileSearch={this.handleMobileSearch}
	    handleCategory={this.handleCategory}
	    categoryTerm={this.state.category}
	    updateQuantity={this.updateQuantity}
	    productQuantity={this.state.moq}
	  />
	  <Products
	    productsList={this.state.products}
	    searchTerm={this.state.term}
	    addToCart={this.handleAddToCart}
	    productQuantity={this.state.quantity}
	    updateQuantity={this.updateQuantity}
	    openModal={this.openModal}
	  />
      </div>
    );
  }
}