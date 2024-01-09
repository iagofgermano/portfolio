var express = require('express');
var router = express.Router();

var blogController = require('../controller/blog.js');

  /* GET home page. */
  router.get('/', blogController.renderIndex);

  /* GET blog page. */
  router.get('/blog', blogController.renderBlogMain);

  router.get(`/:id`, blogController.renderBlogpost);

module.exports = router;
