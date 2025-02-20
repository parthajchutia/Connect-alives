import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Home from '../../pages/Home';

const ProtectRoute = ({children, user, redirect = "/login" }) => {

  if(!user) return <Navigate to={redirect} />

   return children ? children : <Outlet />;
  
}

export default ProtectRoute ;

<ProtectRoute user={false}>
    <Home/>
</ProtectRoute>

