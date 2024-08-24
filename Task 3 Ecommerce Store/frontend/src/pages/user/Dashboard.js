import React from 'react';
import Layout from '../../components/layout/layout.js';

import { useAuth } from '../../context/auth.js';
import { FaUser, FaEnvelope, FaHome } from 'react-icons/fa';
import UserMenu from '../../components/layout/UserMenu.js';


const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard-container" style={{paddingTop:'100px'}}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 dashboard-card">
              <h3 className="dashboard-item">
                <FaUser className="dashboard-icon" />
                {auth?.user?.name}
              </h3>
              <h3 className="dashboard-item">
                <FaEnvelope className="dashboard-icon" />
                {auth?.user?.email}
              </h3>
              <h3 className="dashboard-item">
                <FaHome className="dashboard-icon" />
                {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;