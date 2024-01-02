import React from "react"
import Login from "./Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard"
import Product from "./Product"
import Inventory from "./Inventory"
import Home from "./Home"
import AddProduct from "./AddProduct"
import EditProduct from "./EditProduct"
import ChangeLogin from "./ChangeLogin"
import Purchase from "./Purchase"
import EditPurchase from "./EditPurchase"

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard />}>
    <Route path='/home' element={<Home />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/inventory' element={<Inventory />}></Route>
      <Route path='/createproduct' element={<AddProduct />}></Route>
      <Route path='/productEdit/:id' element={<EditProduct />}></Route>
      <Route path='/purchase' element={<Purchase />}></Route>
      <Route path='/purchaseEdit/:id' element={<EditPurchase />}></Route>
    </Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/changelogin' element={<ChangeLogin />}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
