import React from 'react'

import AdminNav from '../../../components/nav/AdminNav'

const AdminDashboard = () => {

    return (
        <div className="container-fluid">
            <div className="col md-2">
                <AdminNav />
            </div>
            <div className="col">
            Create category
            </div>
        </div>
    )
}

export default AdminDashboard