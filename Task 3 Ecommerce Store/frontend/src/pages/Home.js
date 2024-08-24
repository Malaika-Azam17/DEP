import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../components/layout/layout.js";

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/AllProductPage");
  };

  return (
    <Layout>
      <div className="container" style={{ padding: '1rem', backgroundColor: 'rgb(208, 178, 235)',marginTop: '4rem',boxShadow:"0px 0px 14px black" }}>
        {/* Welcome Section */}
        <div className="text-center mb-4" style={{ marginTop: '3rem' }}>
          <h1 style={{ marginBottom: '2rem', color: "rgb(92, 68, 113)" }}>
            Welcome to Blossomify
          </h1>
          <p style={{ color: "rgb(92, 68, 113)", fontSize: '1.25rem' }}>
          At Blossomify, we offer a curated selection of fresh, vibrant flowers that bring beauty and joy to any occasion. From elegant bouquets to charming arrangements, each bloom is carefully chosen to brighten your day and enhance your special moments. Explore our collection and discover the perfect floral gift or decoration to express your love, celebrate milestones, or simply add a touch of nature's elegance to your life. Let us help you create unforgettable memories with the beauty of our flowers
          </p>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(92, 68, 113)",
              padding: "1rem",
              borderRadius: "24px",
              fontWeight: 700,
              boxShadow: "none",
              transition: "box-shadow 0.3s ease",
            }}
            onClick={handleExploreClick}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 0px 14px black'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            Explore Products
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
