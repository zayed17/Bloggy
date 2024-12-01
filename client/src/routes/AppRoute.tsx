import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage  from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import AddBlogPage from '../pages/AddBlogPage';
import BlogListPage from '../pages/BlogListPage';



const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/add-blog" element={<AddBlogPage/>} />
        <Route path="/my-blog" element={<BlogListPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
