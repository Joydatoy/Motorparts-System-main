import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

function Inventory() {
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
            <h3> Inventory List</h3>
        </div>
        <Link to='/createproduct' className= 'btn btn-success'>Add Inventory</Link>
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
                <Link to={`/productEdit/`+product.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                <button onClick={e => handleDelete(product.id)} className='btn btn-sm btn-danger'>Delete</button>
              </td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
</div>
    )
}

export default Inventory