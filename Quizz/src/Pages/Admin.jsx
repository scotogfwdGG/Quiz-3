import React from 'react'
import FormAdmin from '../Components/FormAdmin'
import DashboardAdmin from '../Components/DashboardAdmin'
import ManageUsers from '../Components/ManageUsers'
import ManageProducts from '../Components/ManageProducts'
import ManageRutinas from '../Components/ManageRutinas'
import '../Styles/SeriousSporty.css';

function Admin() {
  return (
    <div>
      <FormAdmin />
      <DashboardAdmin />
      <ManageUsers />
      <ManageProducts />
      <ManageRutinas/>
    </div>
  )
}

export default Admin