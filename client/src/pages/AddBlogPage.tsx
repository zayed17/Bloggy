import React from "react";
import Header from "../components/Header";
import AddBlogForm from "../components/AddBlogForm";

const AddBlogPage: React.FC = () => {
  return (
    <div>
      <Header /> 
      <div className="container mx-auto p-6">
        <AddBlogForm /> 
      </div>
    </div>
  );
};

export default AddBlogPage;
