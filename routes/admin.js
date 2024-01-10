var express = require('express');
var csrf = require('csurf')
var router = express.Router();
require('dotenv').config();

var csrfProtection = csrf({ cookie: true })

var passport = require('passport');

var user = require("../db/models").User;

require('../config/passport/passport')(passport, user);

var adminController = require('../controller/admin.js');

//GET ROUTES

router.get(`/${process.env.ADMIN_ENDPOINT}`, isLoggedIn, csrfProtection, adminController.renderAdmin);

router.get(`/${process.env.ADMIN_ENDPOINT}/${process.env.APP_SECRET}`, csrfProtection, function(req, res, next){
  res.render('admin-signup', {csrfToken: req.csrfToken()});
});

router.get(`/${process.env.ADMIN_ENDPOINT}/login`, csrfProtection, function(req, res, next){
  res.render('admin-login', {csrfToken: req.csrfToken()});
});

router.get(`/${process.env.ADMIN_ENDPOINT}/posts`, isLoggedIn, csrfProtection, adminController.renderPosts);

//POST ROUTES

router.post(`/login`, csrfProtection, passport.authenticate('login', {
  successRedirect: `/${process.env.ADMIN_ENDPOINT}`,
  failureRedirect: `/${process.env.ADMIN_ENDPOINT}/login`
}));

router.post(`/signup`, csrfProtection, passport.authenticate('signup', {
  successRedirect: `/${process.env.ADMIN_ENDPOINT}`,
  failureRedirect: `/${process.env.ADMIN_ENDPOINT}/signup`
}
));

router.post(`/create-post`, csrfProtection, adminController.createPost);

router.post(`/create-tag`, csrfProtection, adminController.createTag);

router.post(`/delete-post`, csrfProtection, adminController.deletePost)

//MIDDLEWARE FUNCTIONS

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect(`/${process.env.ADMIN_ENDPOINT}/login`);
}

module.exports = router