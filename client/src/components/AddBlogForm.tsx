import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Space } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useAddblogMutation } from "../api/blogApi";
import { useNavigate } from "react-router-dom";

const AddBlogForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const [addblog,{isLoading}]=useAddblogMutation()

  const handleUploadChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile<any>>) => {
    console.log("clicked", newFileList, "chdkd")
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj as RcFile;
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFileList([]);
  };
  
  const onFinish = async (values: any) => {

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", fileList[0].originFileObj  as RcFile);
    formData.append("description", values.description);

    try {
      await addblog(formData).unwrap();
      message.success("Blog added successfully!");
      navigate('/home');

    } catch (error) {
      console.error(error);
      message.error("Failed to add the Blog.");
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-semibold mb-6 text-black">Add New Blog</h2>
      <Form name="add_blog_form" layout="vertical" onFinish={onFinish} initialValues={{ remember: true }} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 mx-auto">
        <Form.Item label="Blog Title" name="title"
          rules={[
            { required: true, message: "Please input the title of the blog!" },
            {
              validator: async (_, value) => {
                if (!value || value.trim() === "") {
                  return Promise.reject(new Error("Title cannot be empty or just whitespace!"));
                }
              },
            },
          ]}>

          <Input size="large" placeholder="Enter blog title" className="rounded-lg" style={{ borderColor: "black" }}/>
        </Form.Item>

        <Form.Item
  label="Blog Image"
  name="image"
  valuePropName="fileList" 
  getValueFromEvent={(e: any) => e.fileList}
  rules={[
    {
      required: true,
      message: "Please upload a blog image!",
      validator(_) {
        if (fileList.length === 0) {
          return Promise.reject(new Error("Please upload a blog image!"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Upload 
    listType="picture-card" 
    maxCount={1} 
    showUploadList={false} 
    onChange={handleUploadChange} 
    beforeUpload={() => false}
    fileList={fileList} // Pass the fileList here to Upload component
  >
    {fileList.length < 1 && (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )}
  </Upload>

  {imagePreview && (
    <div style={{ marginTop: "10px" }}>
      <img 
        src={imagePreview} 
        alt="preview" 
        style={{ width: "100%", borderRadius: "8px" }} 
      />
      <Space style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <Button 
          icon={<DeleteOutlined />} 
          onClick={handleRemoveImage} 
          style={{ borderRadius: "8px", backgroundColor: "red", color: "white" }}
        >
          Remove Image
        </Button>
      </Space>
    </div>
  )}
</Form.Item>

        <Form.Item label="Blog Description" name="description"
          rules={[
            { required: true, message: "Please input the blog description!" },
            {
              validator: (_, value) => {
                if (value && value.trim().split(/\s+/).length >= 25) {
                  return Promise.resolve(); 
                }
                return Promise.reject(new Error("Description must be at least 25 words!"));
              },
            },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Enter blog description (minimum 25 words)" className="rounded-lg" style={{ borderColor: "black" }}/>
        </Form.Item>


        <Form.Item>
          <Button htmlType="submit" block size="large" loading={isLoading} className="bg-black text-white border-none rounded-lg hover:bg-gray-800 transition duration-300">
            Add Blog
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBlogForm;
