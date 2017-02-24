console.log('user controller');
var mongoose = require('mongoose')
var User = mongoose.model('User');
function UsersController(){

  this.create = function(req,res){
    console.log('server controller again', req.body);
    User.create(req.body, function(err, result){
      if(err){
        console.log('there was an error: ',err)
      }else{
        console.log('successfully created user');
        res.json(result)
      }
    })
  };
  this.user = function(req,res){
    console.log('at user server',req.params.id);
    User.findById(req.params.id,function(err,result){
      if(err){
        console.log(err);
      } else {
        res.json(result)
      }
    })
  }
  this.addTopic = function(req,res){
    User.findById(req.body._id,function(err,user){
      if (err){
        console.log(err);
      } else {
        user.topics.push(req.body.topic)
        user.save(function(err,result){
          if(err){
            console.log('there was an error saving user',err);
          } else {
            console.log('sucessfully saved user with topic',result);
            res.json(result)
          }
        })
      }
    })
  }
  this.addPost = function(req,res){
    User.findById(req.body._id,function(err,user){
      if(err){
        console.log('there was an error finding user',err);
      } else {
        console.log('found user',user);
        user.posts.push(req.body.post);
        user.save(function(err,result){
          if(err){
            console.log('there was an error saving user',err);
          } else {
            console.log('successfully saved user',result);
            res.json(result)
          }
        })
      }
    })
  }
  this.addComment = function(req,res){
    User.findById(req.body._id,function(err,user){
      if(err){
        console.log('there was an error finding user',err);
      } else {
        console.log('here is req body comment:======',req.body.comment);
        user.comments.push(req.body.comment)
        console.log('here is user after push:======',user);
        user.save(function(err,result){
          if(err){
            console.log('there was an error saving user',err);
          } else {
            console.log('successfully saved comment to user',result);
            res.json(result)
          }
        })
      }
    })
  }

}
module.exports = new UsersController();
