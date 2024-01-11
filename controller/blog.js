const createHttpError = require('http-errors');

const Post = require('../db/models').Post;
const Tag = require('../db/models').Tag;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
require('dotenv').config();

var exports = module.exports = {};

exports.renderIndex = async function(req, res, next) {
    var posts = await Post.findAll({
        include: Tag,
        limit: 3,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    res.render('index', {posts: posts, months: months});
};

exports.renderBlogMain = async function(req, res, next) {
    if(req.query.q){
        if(!Number(req.query.q)){
            next();
            return;
        }
        var tag = req.query.q;
        var posts = await Post.findAll({
            include: [{
                model: Tag,
                where: {id: tag},
                order: [
                    ['createdAt', 'DESC'],
                ]
            }]
        });

        if(!posts){
            next();
            return;
        }

    } else {
        var posts = await Post.findAll({
            include: Tag,
            order: [
                ['createdAt', 'DESC'],
            ]
        });
    }
    var tags = await Tag.findAll();
    
    res.render('blog', {
        posts: posts, 
        tags: tags, 
        months: months
    });
};

exports.renderBlogpost = async function(req, res, next) {
    var postId = req.params.id;
    if(!Number(postId)){
        next();
        return;
    }
    var post = await Post.findAll({
        include: Tag,
        where: {
            id: postId
        }
    });

    if(post == ''){
        next();
        return;
    }

    res.render('blogpost', {post: post[0]});

};