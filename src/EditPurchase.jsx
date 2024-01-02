import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditPurchase() {
    const [data, setData] = useState({
		productname: '',
		brandname: '',
        quantity: '',
        price: ''
		
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:3000/get/'+id)
		.then(res => {
			setData({...data, productname: res.data.Result[0].productname,
				brandname: res.data.Result[0].brandname,
				quantity: res.data.Result[0].quantity,
                price: res.data.Result[0].price,
                image: res.data.Result[0].image
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		
        axios.post('http://localhost:3000/purchase'+id, data)
		.then(res => {
            if(res.data.Status === "Success"){
                navigate('/product')
            }
		
		})
		.catch(err => console.log(err));
	}
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
        <h2>Purchase Product</h2>
        <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
                <label for="inputproductname" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="inputproductname" placeholder='Enter ProductName' autoComplete='off'
                onChange={e => setData({...data, productname: e.target.value})} value={data.productname}/>
            </div>
            <div class="col-12">
                <label for="inputbrandname" class="form-label">Brand Name</label>
                <input type="text" class="form-control" id="inputbrandname" placeholder='Enter BrandName' autoComplete='off'
                onChange={e => setData({...data, brandname: e.target.value})} value={data.brandname} />
            </div>
            <div class="col-12">
                <label for="inputquantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="inputquantity" placeholder='Enter Quantity'
                 onChange={e => setData({...data, quantity: e.target.value})} value={data.quantity} />
            </div>
            <div class="col-12">
                <label for="inputprice" class="form-label">Price</label>
                <input type="number" class="form-control" id="inputprice" placeholder="Enter Price" autoComplete='off'
                onChange={e => setData({...data, price: e.target.value})} value={data.price}/>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Purchase Product</button>
            </div>
        </form>
    </div>
    )
}

export default EditPurchase