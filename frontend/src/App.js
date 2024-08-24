import { Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Auth from "./components/Auth.js"
import Blogs from "./components/Blogs.js"
import UserBlogs from "./components/UserBlog.js"
import BlogDetail from "./components/BlogDetail.js"
import AddBlog from "./components/AddBlog.js"
import Footer from "./components/Footer"; 
import Home from "./components/Home.js"
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn=useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn)
  return <React.Fragment>
    <header>
      <Header>

      </Header>
    </header>
    <main >
      
      <Routes >
        <Route path="" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/myblogs" element={<UserBlogs/>}/>
        <Route path="/myblogs/:id" element={<BlogDetail/>}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>
      </Routes>
      <footer>
      <Footer />
      </footer>
    </main>
  </React.Fragment>
}

export default App;
