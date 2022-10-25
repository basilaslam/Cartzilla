const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  article_image: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
