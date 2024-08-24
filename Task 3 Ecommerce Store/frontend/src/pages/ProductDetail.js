import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import axios from "axios";
import { useCart } from '../context/cart.js';
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  //inital  details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`
        /api/v1/product/get-product/${params.slug}
      `);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (!product._id) return; 
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added to cart");
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="450"
            width={"350px"}
          />
        </div>
        <div className="col-md-6  " style={{paddingTop:"3rem"}}>
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1" 
          style={{backgroundColor:"rgb(92, 68, 113)"}}
          onClick={addToCart}
          
          >ADD TO CART</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;