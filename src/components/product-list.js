import React, { Component } from "react";
import {Table,ButtonGroup,Button,Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

import UserService from "../services/user.service";

export default class ProductList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
				products : []
		};
	}
	
	componentDidMount(){
		this.findAll();
	}
	
	findAll(){
		UserService.getPublicContent()
	  	.then(response => response.data)
	  	.then((data) => {
	  		this.setState({products:data});
	  	});
	}
	
	delProduct(productId){
		UserService.deleteProduct(productId)
			.then(response => {
				if(response.data != null){
					this.setState({"show":true});
					setTimeout(() => this.setState({"show":false}),3000);					
					this.setState({
						products: this.state.products.filter(product => product.id !== productId)
					});
				}else{
					this.setState({"show":false});					
				}
			});
	}
	
	render() {
		
		return (
		
			<div>
				<Table>
				<thead>
				    <tr>
				      <th>Image</th>
				      <th>Product Name</th>
				      <th>Price</th>
				      <th>Actions</th>
				    </tr>
				</thead>
				<tbody>
				   {
					   this.state.products.length === 0 ?
					  <tr align="center">
				      	<td colSpan="3">No Items Available</td>
				      </tr> :
				    	  this.state.products.map((product)=>(
				      <tr key={product.id}>	
				      	<td><Image src={product.imageURL} roundedCircle width="25" height="25"/></td>
				      	<td>{product.name}</td>
				      	<td>{product.price}</td>					      	
				      	<td>
				      		<ButtonGroup>
				      			<Link to={"edit/"+product.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}						      			
				      			<Button size="sm" variant="outline-danger" onClick={this.delProduct.bind(this,product.id)}><FontAwesomeIcon icon={faTrash}/></Button>
				      		</ButtonGroup>
				      	</td>
				      </tr>
				      ))
				  } 
				  </tbody>
				 </Table>
			</div>
		)
	}
}