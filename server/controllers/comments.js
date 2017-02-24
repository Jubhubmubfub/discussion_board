console.log('comment controller');
var mongoose = require('mongoose')
var Comment = mongoose.model('Comment');
function CommentsController(){

  this.create = function(req,res){
    console.log('server controller again', req.body);
    Comment.create(req.body, function(err, result){
      if(err){
        console.log('there was an error: ',err)
      }else{
        console.log('successfully created comment');
        res.json(result)
      }
    })
  };
  this.index = function(req,res){
    Comment.find({},function(err,result){
      if (err){
        console.log('there was an error indexing comments',err);
        return
      }
      res.json(result)
    })
  }
  this.comment = function(req,res){
    Comment.findById(req.params.id,function(err,result){
      if(err){
        console.log('there was an error finding comment',err);
        return
      }
      res.json(result)
    })
  }

}
module.exports = new CommentsController();
