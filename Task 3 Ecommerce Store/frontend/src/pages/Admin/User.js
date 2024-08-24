import React from 'react'
import Layout from '../../components/layout/layout.js'
import AdminMenu from '../../components/layout/AdminMenu.js'
const User = () => {
  return (
    <Layout title={"Dashboard - All users"}>
         <div className="container-fluid m-3 p-3">
    <div className='row'>
      <div className='col-md-3'>
        <AdminMenu/>
      </div>
      
      <div className='col-md-9'>
        users
      </div>
    </div>
    </div>
    </Layout>
  )
}

export default User
