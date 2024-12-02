import React from "react";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../api/userApi";
import { useLogoutMutation } from "../api/userApi";
import { message } from "antd";

const Sidebar: React.FC = () => {
  const { data, isLoading, isError } = useGetUserQuery({});
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      message.success("Logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      message.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="w-full sm:w-1/4 bg-white shadow-md flex flex-col items-center py-8 px-6 rounded-lg sm:sticky sm:top-0 sm:h-screen">
      <div className="flex flex-col items-center mb-5">
        <Avatar size={64} icon={<UserOutlined />} className="mb-4" />
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading user data</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-900 text-center">
              {data?.name}
            </h2>
            <p className="text-sm text-gray-500 text-center">{data?.email}</p>
          </>
        )}
      </div>


      <div className="flex flex-col space-y-4 w-full sm:space-y-0 sm:space-x-4 sm:flex-row">
        <Link to="/my-blog" className="w-full">
          <Button className="bg-black text-white rounded-lg px-6 py-2 w-full" size="large">
            My Blog
          </Button>
        </Link>

        <Link to="/add-blog" className="w-full">
          <Button className="bg-black text-white rounded-lg px-6 py-2 w-full" size="large">
            + Add Blog
          </Button>
        </Link>
      </div>


      <div className="mt-5 w-full">
        <Button onClick={handleLogout} className="bg-red-500 text-white rounded-lg px-6 py-2 w-full" size="large">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
