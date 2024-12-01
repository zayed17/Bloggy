import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { addblog, deleteBlog, getBlog, getUserBlog } from '../controllers/blogController';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';


dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME as string, 
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `articles/${Date.now()}_${file.originalname}`;
      cb(null, fileName); 
    },
  }),
});


const router = express.Router();

router.get('/get-blog',getBlog);
router.get('/get-user-blog',authMiddleware,getUserBlog);
router.delete('/delete/:id',deleteBlog);
router.post('/add-blog', upload.single('image'),authMiddleware,addblog);



export default router;
