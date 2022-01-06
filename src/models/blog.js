const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Memberitahu express bahwa file blog.js yang berada di balam folder Model ia adalah sebuah model untuk blog

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BlogPost', BlogPost);
