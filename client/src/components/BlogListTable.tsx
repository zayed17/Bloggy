import React from "react";
import { Table, Button, Avatar, Spin, Alert, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetUserblogQuery, useDeleteblogMutation } from "../api/blogApi";

const BlogListTable: React.FC = () => {
  const { data: blogs, error, isLoading, refetch } = useGetUserblogQuery({});
  const [deleteBlog] = useDeleteblogMutation();
  console.log(blogs, "checking for blog");

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image: string) => <Avatar src={image} size={50} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span
          className="block truncate text-gray-900 max-w-xs"
          title={text}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-4">
          <Button
            icon={<EditOutlined />}
            className="bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              className="bg-red-500 text-white rounded-lg hover:bg-red-600"
              size="small"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    console.log("Edit blog:", record);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      refetch();
      message.success("Blog deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      message.error("Failed to delete the blog.");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
      {isLoading && (
        <div className="text-center">
          <Spin tip="Loading blogs..." />
        </div>
      )}
      {error && (
        <Alert
          message="Error"
          description="Failed to load blogs. Please try again later."
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      {!isLoading && !error && (
        <>
          <div className="mb-4">
            <Link to="/home">
              <Button className="bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Back to Home
              </Button>
            </Link>
          </div>
          <Table
            columns={columns}
            dataSource={blogs?.map((blog: any, index: number) => ({
              ...blog,
              key: blog._id || index,
            }))}
            pagination={false}
            className="bg-white rounded-lg"
          />
        </>
      )}
    </div>
  );
};

export default BlogListTable;
