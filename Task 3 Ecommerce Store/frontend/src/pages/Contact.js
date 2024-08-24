import React from 'react'
import Layout from "./../components/layout/layout.js"
import { FaMap, FaPhone, FaEnvelope} from 'react-icons/fa';
const Contact = () => {
    return (
        <Layout>
            <div id="contact">
            <h2>CONTACT <span>US</span></h2>
            <div className="contact-section">
                <div className="contact-form">
                    <form action="">
                        <input type="text" required placeholder="Name" className="input-box" /><br />
                        <input type="email" required placeholder="Email" className="input-box" /><br />
                        <input type="text" placeholder="Subject" className="input-box" /><br />
                        <textarea name="Message" placeholder="Message"></textarea><br />
                        <button className="btnn">Send</button>
                    </form>
                </div>
                <div className="contact-info">
                    <h2>Contact Info</h2>
                    <p>If you have any query feel free to contact us. We are here to assist you.</p>
                    <div className="list-info">
                       
                        <div className="list-item">
                            <FaMap className="fa" />
                            <li>Location<br /><span>S123 Flower St, Bloomtown</span></li>
                        </div>
                        <div className="list-item">
                            <FaPhone className="fa" />
                            <li>Call Us<br /><span> +123 456 7890</span></li>
                        </div>
                        <div className="list-item">
                            <FaEnvelope className="fa" />
                            <li>Email<br /><span>contact@yourstorename.com</span></li>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </Layout>
    )
}

export default Contact
