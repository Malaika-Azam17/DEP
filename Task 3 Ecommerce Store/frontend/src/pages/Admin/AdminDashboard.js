import React from "react";
import Layout from '../../components/layout/layout.js'
import { useAuth } from "../../context/auth.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import { FaUserTie, FaEnvelope, FaPhone } from "react-icons/fa";


const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 admin-dashboard-container" style={{paddingTop:'100px'}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 admin-dashboard-card">
              <h3 className="admin-dashboard-item">
                <FaUserTie className="admin-dashboard-icon" />
                Admin Name: {auth?.user?.name}
              </h3>
              <h3 className="admin-dashboard-item">
                <FaEnvelope className="admin-dashboard-icon" />
                Admin Email: {auth?.user?.email}
              </h3>
              <h3 className="admin-dashboard-item">
                <FaPhone className="admin-dashboard-icon" />
                Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;