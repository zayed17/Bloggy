import React, { useState } from "react";
import { Avatar } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useGetblogQuery } from "../api/blogApi";

const MainContent: React.FC = () => {
  const { data: blogs, error, isLoading } = useGetblogQuery({});
  console.log(blogs, "checking");

  const [expandedBlogs, setExpandedBlogs] = useState<Set<string>>(new Set());

  const toggleExpand = (blogId: string) => {
    setExpandedBlogs((prevState) => {
      const newExpandedBlogs = new Set(prevState);
      if (newExpandedBlogs.has(blogId)) {
        newExpandedBlogs.delete(blogId);
      } else {
        newExpandedBlogs.add(blogId);
      }
      return newExpandedBlogs;
    });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-6">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-500">Error loading blogs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="main-feed-container mx-auto max-w-4xl mt-6 mb-6 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">Latest Blogs</h2>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog: any) => {
          const formattedTime = formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true });
          const isExpanded = expandedBlogs.has(blog._id); 
          
          return (
            <div key={blog._id} className="w-full border shadow-lg rounded-lg overflow-hidden mb-6">
              <div className="flex items-center p-3">
                <Avatar src={"https://via.placeholder.com/150"} size={50} />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{`${blog.userId.name}`}</p>
                  <p className="text-sm text-gray-500">Posted {formattedTime}</p>
                </div>
              </div>

              <div className="px-4">
                <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                <p className="text-gray-700 mt-2">
                  {isExpanded ? blog.description : `${blog.description.slice(0, 100)}...`} 
                </p>
                <button className="text-blue-500 " onClick={() => toggleExpand(blog._id)} >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              </div>

              <div className="w-full h-100 overflow-hidden">
                <img alt={blog.title} src={blog.imageUrl} className="mt-4 w-full h-auto object-cover cursor-pointer" 
                style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}/>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}
    </div>
  );
};

export default MainContent;
