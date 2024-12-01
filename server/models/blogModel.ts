import mongoose, { Document, Schema } from 'mongoose';

interface IBlog extends Document {
  title: string;
  description: string;
  imageUrl: string;
  userId: mongoose.Schema.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true },
}, {
  timestamps: true, 
});

const Blog = mongoose.model<IBlog>('blog', blogSchema);

export default Blog;
