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
				<table className="product-list">
				<thead className="list-header">
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
				      	<td><img src={product.image} width="40" height="40"/></td>
				      	<td>{product.name}</td>
				      	<td>{product.price}</td>					      	
				      	<td>
				      		<div>
				      			<Link to={"edit/"+product.id}>
				      			<button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/>
				      			</button></Link>{' '}
				                <button size="sm" variant="outline-danger" onClick={this.delProduct.bind(this,product.id)}><FontAwesomeIcon icon={faTrash}/></button>
				      		</div>
				      	</td>
				      </tr>
				      ))
				  } 
				  </tbody>
				 </table>
			</div>
		)
	}
}