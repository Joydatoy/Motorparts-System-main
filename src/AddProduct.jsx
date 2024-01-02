import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
    const [data, setData] = useState({
		productname: '',
		brandname: '',
		quantity: '',
		price: '',
		image: ''
	})
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("productname", data.productname);
		formdata.append("brandname", data.brandname);
		formdata.append("quantity", data.quantity);
		formdata.append("price", data.price);
		formdata.append("image", data.image);
        axios.post('http://localhost:3000/createproduct', formdata)
		.then(res => {
			navigate('/product')
		})
		.catch(err => console.log(err));
	}
    return (
<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Product</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputproductname" class="form-label">Product Name</label>
					<input type="text" class="form-control" id="inputproductname" placeholder='Enter Product Name' autoComplete='off'
					onChange={e => setData({...data, productname: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputbrandbame" class="form-label">Brand Name</label>
					<input type="text" class="form-control" id="inputbrandname" placeholder='Enter Brand Name' autoComplete='off'
					onChange={e => setData({...data, brandname: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputquantity" class="form-label">Quantity</label>
					<input type="number" class="form-control" id="inputquantity" placeholder='Enter Quantity'
					 onChange={e => setData({...data, quantity: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputprice" class="form-label">Price</label>
					<input type="number" class="form-control" id="inputprice" placeholder="Enter Price" autoComplete='off'
					onChange={e => setData({...data, price: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
    )
}

export default AddProduct