import React from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always stays at the top */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-1/3 lg:w-1/4 bg-white shadow-md">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-8 bg-gray-100 overflow-y-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
