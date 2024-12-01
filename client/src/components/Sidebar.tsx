import React from "react";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-full sm:w-1/4 bg-white shadow-md flex flex-col items-center py-8 px-6 rounded-lg">
      <div className="flex flex-col items-center mb-5">
        <Avatar size={64} icon={<UserOutlined />} className="mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
        <p className="text-sm text-gray-500">john.doe@example.com</p>
      </div>

      <div className="flex space-x-4 w-full">
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
    </div>
  );
};

export default Sidebar;
