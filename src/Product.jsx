import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import './style.css'

function Product() {
    const [quantity, setQuantity] = useState("")

    const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/getProduct')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>MotorParts Product List</h3>
            </div>
            {/*<Link to='/createproduct' className= 'btn btn-success'>Add Motorparts</Link>*/}
            <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Image</th>
              <th>Brand Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => {
              return <tr key={index}>
                  <td>{product.productname}</td>
                  <td>{
                    <img src={`http://localhost:3000/images/`+product.image} alt="" className='product_image'/>
                    }</td>
                  <td>{product.brandname}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link to={`/purchaseEdit/`+product.id} className='btn btn-primary btn-sm me-2'>Buy</Link>
                    <button onClick={e => handleDelete(product.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
        <Link to='/purchase' className= 'btn btn-success d-flex justify-content-center mt-1'><h4>Save</h4></Link>
      </div>
    </div>
    )
}

export default Product