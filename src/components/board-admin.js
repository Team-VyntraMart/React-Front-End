import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faUndo} from '@fortawesome/free-solid-svg-icons';

import ProductList from "./product-list";
import UserService from "../services/user.service";

const required = value => {
	  if (!value) {
	    return (
	      <div className="alert alert-danger" role="alert">
	        This field is required!
	      </div>
	    );
	 }
};
	
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitProduct = this.submitProduct.bind(this);
  }
  
  initialState = {
			id:'', added_on:'', name:'', price:'', image:''
	};

  componentDidMount() {
    UserService.getAdminBoard();
  }
  
  submitProduct = event => {
		event.preventDefault();
		UserService.addProduct(this.state.name, this.state.price, this.state.image)
			.then(response => {
				if(response.data != null){
					this.setState({"show":true, "method":"post"});
					setTimeout(() => this.setState({"show":false}),3000);
				}else{
					this.setState({"show":false});					
				}
			});
		this.setState(this.initialState);
  };
  
  resetProduct = () => {
		this.setState(() => this.initialState)
  };
  
  productChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		});
  };
  
  refreshPage = () => {
		window.location.reload(false);
  }

  render() {
	  
	  const {name,price,image} = this.state;
	  
    return (
    		<div className="col-md-12">
            <div className="card card-container">
            <div><h3>Add new Product</h3></div>
            <div><br/></div>
              <Form onReset={this.resetProduct}
                onSubmit={this.submitProduct}>
                <div className="form-group">
                  <label>Product name</label>
                  <Input type="text"
                    className="form-control"
                    name="name" autoComplete="off"
                    value={name} placeholder="Enter Product name"
                    onChange={this.productChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <Input type="number"
                    className="form-control"
                    name="price" autoComplete="off"
                    value={price} placeholder="Enter Product price"
                    onChange={this.productChange}
                    validations={[required]}
                  />
                </div>
                  
                  <div className="form-group">
                  <label>Image URL</label>
                  <Input type="text"
                    className="form-control"
                    name="image" autoComplete="off"
                    value={image} placeholder="Enter Image URL"
                    onChange={this.productChange}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                  size="sm" variant="success" type="submit" onClick={this.refreshPage}>
                  <FontAwesomeIcon icon={faSave}/>Save
                  </button>{' '}
                  
                  <button
                  size="sm" variant="info" type="reset">
                  <FontAwesomeIcon icon={faSave}/>Reset
                  </button>
                  </div>
              </Form>
            </div>
            <div> <ProductList/> </div>
          </div>
        );
      }
}