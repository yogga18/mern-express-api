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
      .isLength({ min: 5, max: 2800 })
      .withMessage('Story min 5 and max 1800 Character'),
  ],
  blogController.creatBlog
);

// [GET All]
router.get('/posts', blogController.getAllBlogPost);

// [GET One]
router.get('/post/:postId', blogController.getOneBlogPost);

// [PUT]
router.put(
  '/post/:postId',
  [
    body('title')
      .isLength({ mix: 5, max: 50 })
      .withMessage('Blog Post Title min 5 and max 50 Character'),
    body('body')
      .isLength({ min: 5, max: 2800 })
      .withMessage('Story min 5 and max 2800 Character'),
  ],
  blogController.updateBlogPost
);

// [DELETE]
router.delete('/post/:postId', blogController.destroyBlogPost);

module.exports = router;
