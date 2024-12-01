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
      } catch (error:any) {
        res.status(500).json({ message: 'Failed to add Blog', error: error.message, });
      }
};


export const getBlog = async (req: any, res: Response) => {
    try {
      const blogs = await Blog.find({}).populate('userId')
      console.log(blogs,"checking")

      res.status(200).json(blogs);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
    }
  };


  export const getUserBlog = async (req: any, res: Response) => {
    try {
      const userId = req.userId  
      const blogs = await Blog.find({userId})
      console.log(blogs,"checking for userId")

      res.status(200).json(blogs);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
    }
  };  


  export const deleteBlog = async (req: any, res: Response) => {
    try {
      const blogId = req.params.id
      await Blog.deleteOne({_id:blogId})
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
    }
  };  