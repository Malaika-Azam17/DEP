import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row">
          {/* About Us Column */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">About Us</h5>
            <p>
              At Blossomify, we offer the freshest and most vibrant flowers, sourced directly from trusted growers. 
              Our commitment to quality ensures that every bouquet is handcrafted with care, making your special moments 
              even more memorable.
            </p>
          </div>

          {/* Contact Column */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <FaPhoneAlt className="footer-icon" /> +123 456 7890
              </li>
              <li>
                <FaEnvelope className="footer-icon" /> contact@yourstorename.com
              </li>
              <li>
                <FaMapMarkerAlt className="footer-icon" /> 123 Flower St, Bloomtown
              </li>
            </ul>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/AllProductPage" className="footer-link ">Products</NavLink></li>
              <li><NavLink to="/about" className="footer-link">About Us</NavLink></li>
              <li><NavLink to="/contact" className="footer-link">Contact Us</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
