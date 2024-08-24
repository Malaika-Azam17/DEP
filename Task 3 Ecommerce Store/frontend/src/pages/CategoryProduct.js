import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../context/cart.js';
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(`
        /api/v1/product/product-category/${params.slug}
      `);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center" style={{color:"purple",fontWeight:"600"}}>Category - {category?.name}</h3>
        <h5 className="text-center" style={{color:"purple",fontWeight:"600"}}>{products?.length} result found </h5>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div 
                  className="card m-2"
                  style={{ width: "18rem",border:"2px solid rgb(92, 68, 113)" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{color:"rgb(92, 68, 113)",fontWeight:"600"}}>{p.name}</h5>
                    <p className="card-text" style={{color:"rgb(92, 68, 113)",fontWeight:"600"}}>
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text" style={{color:"rgb(92, 68, 113)",fontWeight:"600"}}> $ {p.price}</p>
                    <button
                    style={{backgroundColor:"rgb(92, 68, 113)",fontWeight:"600"}}
                      className="btn btn-primary ms-1" 
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1" style={{backgroundColor:"rgb(92, 68, 113)"}}
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
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;