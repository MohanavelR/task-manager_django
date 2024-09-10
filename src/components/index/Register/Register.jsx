import React, { useEffect, useState } from 'react'
import { Outlet,Link } from 'react-router-dom'

const Register = () => {
 // select role
return (
    <>
     <div className='container mt-3'>
      <h1 className='text-center'>Register</h1>
     <div className="dropdown mt-2">
  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Select Role
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><Link to={'company'} className="dropdown-item" href="#">Company</Link></li>
    <li><Link to={'branch'}  className="dropdown-item" href="#">Branch</Link></li>
    <li><Link to={'agent'} className="dropdown-item" href="#">Agent</Link></li>
    <li><Link to={'customer'} className="dropdown-item" href="#">Customer</Link></li>
     </ul>
</div>
      <Outlet/>
{/* render register pages */}
     </div>
    </>
  )
}

export default Register
