import React,{Component} from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

import UserService from "../services/user.service";

export default class UpdateProduct extends Component {
	
	constructor(props){
		super(props);
		this.state = {
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
						added_on: response.data.added_on
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
		UserService.updateProduct(productId,this.state.name, this.state.price)
			.then(response => {
				if(response.data != null){
					this.setState({"show":true, "method":"put"});
					setTimeout(() => this.setState({"show":false}),3000);
				}else{
					this.setState({"show":false});					
				}
			});
		this.setState(this.initialState);
	};
	
	render() {
		  
		  const {name,price} = this.state;
		  
	    return (
	    		<Card>
				<Card.Header>Update Product
				</Card.Header>
				<Form onSubmit={this.updProduct} id="Id">
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
					   </Card.Body>
					   <Card.Footer style={{"textAlign":"right"}}>
						<Button size="sm" variant="success" type="submit" onClick={this.refreshPage}>
							<FontAwesomeIcon icon={faSave}/>Save
					    </Button>
					</Card.Footer>
					</Form>
				</Card>	
	)}
}
