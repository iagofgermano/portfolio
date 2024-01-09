const Post = require('../db/models').Post;
const Tag = require('../db/models').Tag;

require('dotenv').config();

var exports = module.exports = {};

exports.renderAdmin = async function(req, res, next) {

    const tags = await Tag.findAll().then(function(tags) {
        res.render('admin', {
            csrfToken: req.csrfToken(),
            tags: tags,
            adminEndpoint: `/${process.env.ADMIN_ENDPOINT}`
        });
  });
};
exports.renderPosts = async function(req, res, next) {

    const posts = await Post.findAll({include: Tag});
        
        res.render('admin-posts', {
            csrfToken: req.csrfToken(),
            posts: posts
        })
};

exports.createPost = async function(req, res, next) {
    var {_csrf: _, title: title, content: content,  ...postTags} = req.body;

    var tags = Object.keys(postTags);
    
    const post = await Post.create(
        {
            title: title,
            content: content,
        }).then(function(post) {
            post.addTags(tags);
        });

        res.redirect(`/${process.env.ADMIN_ENDPOINT}`);
};

exports.createTag = async function(req, res, next) {
    var name = req.body.name;
    const tag = await Tag.create(
        {
            name: name
        }
        ).then(function(data) {
            res.redirect(`/${process.env.ADMIN_ENDPOINT}`);
        });
};

exports.deletePost = async function(req, res, next) {
    var {_csrf: _, ...articles} = req.body;
    var keysToDelete = Object.values(articles);

    await Post.destroy({where: {id: keysToDelete}})

    res.redirect(`/${process.env.ADMIN_ENDPOINT}/posts`);
};