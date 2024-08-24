import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import PageNotFound from "./pages/PageNotFound.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Route/PrivateRoute.js";
import AdminRoute from "./components/Route/AdminRoute.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import User from "./pages/Admin/User.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Product.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import AllProductPage from "./pages/AllProductPage.js";
import ProductDetails from "./pages/ProductDetail.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/AllProductPage" element={<AllProductPage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="*" element={<PageNotFound />} />

<Route element={<PrivateRoute />}>
    <Route path="/dashboard/user" element={<Dashboard />} />
    <Route path="/dashboard/user/profile" element={<Profile/>}/>
  </Route>
        {/* Admin routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
