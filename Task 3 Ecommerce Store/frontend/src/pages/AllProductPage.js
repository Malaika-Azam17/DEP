import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/auth.js"
import { useCart } from '../context/cart.js';

const AllProductPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth,setAuth]=useAuth()

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(true);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <div className="container-fluid row mt-3" style={{padding:"2% 5%",color:"rgb(92, 68, 113)"}}>
        <div className="col-md-12">
          <h1 className="text-center" style={{color:"rgb(92, 68, 113)"}}>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-4" style={{ width: "18rem",color:"rgb(92, 68, 113)",fontWeight:"600" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body" style={{color:"rgb(92, 68, 113)"}}>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 65)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    style={{backgroundColor:"rgb(92, 68, 113)",fontWeight:"600"}}
                    className="btn btn-success ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    style={{backgroundColor:"rgb(92, 68, 113)",fontWeight:"600"}}
                    className="btn btn-success ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      alert("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
              style={{backgroundColor:"rgb(92, 68, 113)",fontWeight:"600",color:"white"}}
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Show More " : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProductPage;
