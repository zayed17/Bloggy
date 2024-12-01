import React from "react";
import Sidebar from "../components/SideBar";
import MainContent from "../components/MainContent";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8  bg-gray-100 overflow-y-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
