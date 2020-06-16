import React, { Component } from "react";
import {Card,Form,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faUndo} from '@fortawesome/free-solid-svg-icons';

import ProductList from "./product-list";
import UserService from "../services/user.service";

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
    	
    		<div>
        	<div>
        	<Card>
    			<Card.Header>Add New Product
    			</Card.Header>
    			<Form onReset={this.resetProduct} onSubmit={this.submitProduct} id="productFormId">
    				<Card.Body>
    					<Form.Row>
    						  <Form.Group as={Col} controlId="formGridTitle">
    						    <Form.Label>Product name</Form.Label>
    						    <Form.Control required autoComplete="off"
    						    	type="text" name="name"
    						    	value={name} onChange={this.productChange}
    						    	placeholder="Enter Product name" />
    						  </Form.Group>
    						  <Form.Group as={Col} controlId="formGridTitle">
    						  	<Form.Label>Product price</Form.Label>
    						    <Form.Control required autoComplete="off"
    						    	type="text" name="price"
    						    	value={price} onChange={this.productChange}
    						    	placeholder="Enter Product price" />
    						  </Form.Group>
    					  </Form.Row>
    					  <Form.Row>
    						  <Form.Group as={Col} controlId="formGridTitle">
    						  	<Form.Label>Product image</Form.Label>
    						    <Form.Control required autoComplete="off"
    						    	type="text" name="image"
    						    	value={image} onChange={this.productChange}
    						    	placeholder="Enter Product image URL" />
    						  </Form.Group>
    					  </Form.Row>
    				   </Card.Body>
    				   <Card.Footer style={{"textAlign":"right"}}>
    					<Button size="sm" variant="success" type="submit" onClick={this.refreshPage}>
    						<FontAwesomeIcon icon={faSave}/>Save
    				    </Button>{' '}
    					<Button size="sm" variant="info" type="reset">
    						<FontAwesomeIcon icon={faUndo}/>Reset
    					</Button>
    				</Card.Footer>
    				</Form>
    			</Card>
    			</div>
    			<div>
    			<ProductList/>
    		</div>
    		  </div>
        );
      }
}