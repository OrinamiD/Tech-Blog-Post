import Admin from "../models/admin.model.js";
import type { IBlog } from "../models/blogs.model.js";

import Blog from "../models/blogs.model.js";
import User from "../models/user.model.js";
import cloudinary from "../configs/cloudinary.config.js";

export const handleBlogCreation = async (
  data: IBlog,
  id: string,
  files: Express.Multer.File[],
) => {
  const admin = await Admin.findById(id);

  if (!admin) {
    throw new Error("user does not exist");
  }

  const existingBlog = await Blog.findOne({ authorsId: data.authorsId });

  if (!existingBlog) {
    throw new Error("Catgory does not exist");
  }

  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "blog-images",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(file.buffer);
    });
  });

  const results = await Promise.all(uploadPromise);

  const images = results.map((result: any) => ({
    public_id: result?.public_id,
    url: result.secure_url,
  }));

  const newBlog = new Blog({
    ...Blog,
    images,
  });

  await newBlog.save();

  return { blogPost: newBlog };
};

export const handleUpdate = async (data: IBlog, id: string) => {
  const user = await User.findById(id);

  if (!user) throw new Error("User does not exist");

  const existingBlog = await Blog.findById(id);

  if (!existingBlog) throw new Error("post does not exist");

  const updated = await Blog.findByIdAndUpdate(id, { ...data }, { new: true });

  await updated?.save();

  return { product: updated };
};

export const getABlog = async (id: string) => {
  const product = await Blog.findById(id);

  if (!product) throw new Error("Blog post does not exist");

  return { post: product };
};

export const allBlog = async () => {
  const existingBlog = await Blog.find();

  if (!existingBlog) {
    throw new Error("No available blog");
  }

  return { blog: existingBlog };
};

// delete blog

export const handleDeleteBlog = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("use does not exist");

  if (user.role != "admin") throw new Error("Forbidden");

  const product = await Blog.findById(id);

  if (!product) throw new Error("blog does not exist");

  const deletePost = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return { deletedBlog: deletePost };
};
