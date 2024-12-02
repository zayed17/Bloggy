import React from "react";
import Header from "../components/Header";
import EditBlogForm from "../components/EditBlogForm";

const EditBlogPage: React.FC = () => {
  return (
    <div>
      <Header /> 
      <div className="container mx-auto p-6">
        <EditBlogForm /> 
      </div>
    </div>
  );
};

export default EditBlogPage;
