import React from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import BlogListTable from "../components/BlogListTable";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8  bg-gray-100 overflow-y-auto">
          <BlogListTable />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
