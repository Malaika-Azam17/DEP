import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { useAuth } from "../../context/auth.js";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/v1/category/create-category',
        { name }
      );
      if (data?.success) {
        alert(`${name} is created`);
        getAllCategory();
        setName("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in input form");
    }
  };
  
  

  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      if (data.success) {
        alert(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setIsVisible(false);
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        
        getAllCategory();
        alert("Deleted Successfully")
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-8  " style={{padding:"4%",backgroundColor:"rgb(204, 177, 234)",borderRadius:"12px",boxShadow:"0px 0px 13px purple",marginTop:"2%"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => {
                            setIsVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="modal fade"
              id="editModal"
              tabIndex="-1"
              aria-labelledby="editModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">
                      Edit Category
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <CategoryForm
                      value={updatedName}
                      setValue={setUpdatedName}
                      handleSubmit={handleUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;