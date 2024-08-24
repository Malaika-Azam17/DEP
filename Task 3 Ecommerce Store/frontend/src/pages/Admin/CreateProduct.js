import Layout from "../../components/layout/layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      } else {
        alert("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
     alert("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
  
      const source = axios.CancelToken.source(); 
      const { data } = await axios.post("/api/v1/product/create-product", productData, {
        cancelToken: source.token,
        
      });
  
      if (data?.success) {
        alert("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert(data?.message || "Failed to create product");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request canceled:', error.message);
        alert("Request was canceled");
      } else if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        alert("Server Error: " + error.response.data.message);
      } else if (error.request) {
        console.error('Request Data:', error.request);
        alert("No response received from server");
      } else {
        console.error('Error Message:', error.message);
        alert("Error in request configuration");
      }
    }
  };
  
  

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 "style={{paddingTop:'100px'}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option>Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={(e) => setShipping(e.target.value)}
                  value={shipping}
                >
                  <option>Select Shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;