import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import Blog from '../models/blogModel';



export const addblog = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;

    const imageUrl = req.file ? req.file.location : null;
    const userId = req.userId
    const newBlog = new Blog({
      title,
      description,
      userId,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to add Blog', error: error.message, });
  }
};


export const getBlog = async (req: any, res: Response) => {
  try {
    const blogs = await Blog.find({}).populate('userId')
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
};


export const getUserBlog = async (req: any, res: Response) => {
  try {
    const userId = req.userId
    const blogs = await Blog.find({ userId })


    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
};


export const deleteBlog = async (req: any, res: Response) => {
  try {
    const blogId = req.params.id
    await Blog.deleteOne({ _id: blogId })
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
};



export const getBlogById = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
       res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog", error: err });
  }
};



export const editBlog = async (req: any, res: Response) => {
try {
  const { id } = req.params;
  console.log(id,"id undo")
  const { title, description } = req.body;

  const blog = await Blog.findById(id);
  console.log(blog,"chek")
  if (!blog) {
     res.status(404).json({ message: 'Blog not found' });
     return
  }

  console.log(req.file, req.body,"chekcing ")

  if (req.file) {
    blog.imageUrl = req.file.location; 
  }

  blog.title = title || blog.title; 
  blog.description = description || blog.description;

  await blog.save();

  res.status(200).json(blog);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Failed to update the blog' });
}

};