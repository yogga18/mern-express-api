const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog'); // Call Model Database

// [POST]
const creatBlog = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Value yang anda masukkan tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error('Harus menyertakan Image');
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: 'Yogga Aditya Candra' },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: 'Create Blog Post Success',
        data: result,
      });
    })
    .catch((err) => {
      console.log('err :', err);
    });
};

// GET
const getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: 'Get All data Posts Success',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  creatBlog,
  getAllBlogPost,
};
