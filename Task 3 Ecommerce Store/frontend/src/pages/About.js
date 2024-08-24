import React from 'react';
import Layout from './../components/layout/layout.js';
import aboutImage from './istockphoto-146839166-612x612.jpg'; 

const About = () => {
  return (
    <Layout>
      <div className="about" id="about">
        
        <div className="row">
        <h1 className="heading">
          ABOUT <span>US.</span>
        </h1>
          <div className="image-container">
            <img src={aboutImage} alt="about us" />
         
          </div>
          <div className="para-container">
            <h3 className='head-para'>Why Choose Us?</h3>
            <p>At Blossomify, we are dedicated to delivering the freshest, most vibrant flowers, carefully sourced from trusted growers to ensure premium quality. Each bouquet is meticulously handcrafted by our skilled florists, adding a personal touch to every order. Whether you're celebrating a special occasion or simply brightening someone's day, our exceptional customer service and fast, reliable delivery make it effortless to share the joy and beauty of flowers with those you care about. Plus, our wide selection of stunning arrangements ensures you'll find the perfect bouquet for every moment.</p>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
