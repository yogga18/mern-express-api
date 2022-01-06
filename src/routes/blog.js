const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Call Controller
const blogController = require('../contollers/blog');

// [POST] : /v1/blog/post
router.post(
  '/post',
  [
    body('title')
      .isLength({ min: 5, max: 50 })
      .withMessage('Blog Post Title min 5 and max 50 Character'),
    body('body')
      .isLength({ min: 5, max: 1800 })
      .withMessage('Story min 5 and max 1800 Character'),
  ],
  blogController.creatBlog
);

// [GET All]
router.get('/posts', blogController.getAllBlogPost);

module.exports = router;
