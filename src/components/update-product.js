import React,{Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

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

export default class UpdateProduct extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			id:'',
			show : false
		};
		this.productChange = this.productChange.bind(this);
		this.updProduct = this.updProduct.bind(this);
	}
	
	componentDidMount() {
		const productId = +this.props.match.params.id;
		if(productId){
			this.findById(productId);
		}
	}
	
	findById(productId) {
		UserService.findProductById(productId)
			.then(response => {
				if(response.data != null){
					this.setState({
						id: response.data.id,
						name: response.data.name,
						price: response.data.price,
						added_on: response.data.added_on,
						image: response.data.image
					});
				}
			}).catch((error) => {
				console.error("Error - "+error);
			});
	}
	productChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		});
	};
	
	updProduct = productId =>{
		UserService.updateProduct(productId,this.state.name, this.state.price, this.state.image)
			.then(response => {
				if(response.data != null){
					this.setState({"show":true, "method":"put"});
					setTimeout(() => this.setState({"show":false}),3000);
					setTimeout(() => this.list(),2000);
				}else{
					this.setState({"show":false});					
				}
			});
		this.setState(this.initialState);
	};
	
	list = () => {
		return this.props.history.push("/admin");
	}
	
	render() {
		  
		  const {name,price,image} = this.state;
		  let productId = this.state.id;
		  
	    return (
	    	<div className="col-md-12">
	          <div className="card card-container">
	            <div><h3>Update Product</h3></div>
	            <div><br/></div>
	            <Form onSubmit={this.updProduct.bind(this,productId)} id="Id">
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
					<button size="sm" variant="success" type="submit">
						<FontAwesomeIcon icon={faSave}/>Save
					</button>
				</div>
			</Form>
			</div>
		</div>
	);
   }
}