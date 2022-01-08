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

// GET ONE
const getOneBlogPost = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error(
          'Sorry, the blog you were looking for could not be found'
        );
        error.errorStatus = 404;
        throw error;
      } else {
        res.status(200).json({
          message: 'The blog you were looking for has been found',
          data: result,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const updateBlogPost = (req, res, next) => {
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
  const body = req.body.body;
  const image = req.file.path;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error(
          'Sorry, the blog you were looking for could not be found'
        );
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Update Success',
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
  getOneBlogPost,
  updateBlogPost,
};
