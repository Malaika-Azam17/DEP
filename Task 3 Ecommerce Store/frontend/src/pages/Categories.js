import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/layout";
import { FaTree } from "react-icons/fa";

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div className="container categories-container mt-4">
                <h1 className="categories-heading mb-4" style={{ color: "rgb(92, 68, 113)", textAlign: "center" }}>All Categories</h1>
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-md-4 mt-5 mb-1 gx-3 gy-3" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="btn categories-btn" style={{ color: "white", backgroundColor: "rgb(92, 68, 113)", padding: "3% 3%" }}>
                                <FaTree className="categories-icon" style={{ color: "white" }} /> {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;