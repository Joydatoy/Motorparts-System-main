import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
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
    return (
        <div>
          <h2 className='text-center'>Motorparts Management System Inc.</h2>
          <br />
          <h5 className='text-center'>"Invest in your success, because in the world of business, <br/>you're the ENGINE that drives it forward."</h5>
        <div className='p-3 d-flex justify-content-around mt-3'>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
              <p>"Quality MOTORPARTS: Fueling Perfrormance, Driving Excellence."</p>
           </div>
        </div>
      
       <div className='mt-4 px-5 pt-3 text-center'>
       <h3>List of Product</h3>
       </div>
       <table className="table">
        <thead>
            <th>
                <th>Product Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </th>
                <th>Available Quantity</th>     
            </th>
        </thead>
        <tbody>
        {data.map((product, index) => {
              return <tr key={index}>
                  <td>{product.productname}</td>
                  <td>{product.quantity}</td>
              </tr>
            })}
        </tbody>
       </table>
   </div>
    )
}

export default Home