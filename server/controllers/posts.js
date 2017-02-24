console.log('post controller');
var mongoose = require('mongoose')
var Post = mongoose.model('Post');
function PostsController(){

  this.create = function(req,res){
    console.log('server controller again', req.body);
    Post.create(req.body, function(err, result){
      if(err){
        console.log('there was an error: ',err)
      }else{
        console.log('successfully created post');
        res.json(result)
      }
    })
  };
  this.index = function(req,res){
    Post.find({}).populate('user','comments').exec(function(err,result){
      if (err){
        console.log('there was an error indexing posts',err);
        return
      }
      res.json(result)
    })
  }
  this.post = function(req,res){
    Post.findById(req.params.id,function(err,result){
      if(err){
        console.log('there was an error finding post',err);
        return
      }
      res.json(result)
    })
  }
  this.addComment = function(req,res){
    Post.findById(req.body._id,function(err,post){
      if(err){
        console.log('there was an error finding post',err);
      } else {
        post.comments.push(req.body.comment)
        post.save(function(err,result){
          if(err){
            console.log('there was an error saving post',err);
          } else {
            console.log('successfully saved post',result);
            res.json(result)
          }
        })
      }
    })
  }

}
module.exports = new PostsController();
