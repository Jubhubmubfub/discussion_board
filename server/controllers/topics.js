console.log('topic controller');
var mongoose = require('mongoose')
var Topic = mongoose.model('Topic');
function TopicsController(){

  this.create = function(req,res){
    console.log('server controller again', req.body);
    Topic.create(req.body, function(err, result){
      if(err){
        console.log('there was an error: ',err)
        res.json(err)
        return
      }else{
        console.log('result is: ',result);
        console.log('successfully created topic');
        res.json(result)
      }
    })
  };
  this.index = function(req,res){
    Topic.find({}).populate('user').exec(function(err,result){
      if (err){
        console.log('there was an error indexing topics',err);
        return
      }
      console.log('after messign with populate',result);
      res.json(result)
    })
  }
  this.topic = function(req,res){
    Topic.findById(req.params.id).populate(['user',{path:'posts',model:'Post',populate:{path:'user',model:'User'}},{path:'posts',populate:{path:'comments',model:'Comment',populate:{path:'user',model:'User'}}}]).exec(function(err,topic){
      if(err){
        console.log('there was an error finding topic',err);
        return
      }
      console.log('this is found topic: ',topic);
      res.json(topic)
    })
  }
  this.addPost = function(req,res){
    console.log('in server topics controller',req.body);
    Topic.findById({_id:req.body._id},function(err,topic){
      if(err){
        console.log(err);
      } else {
        topic.posts.push(req.body.post)
        topic.save(function(err,topic){
          if(err){
            console.log('error saving topic ',err);
          } else {
            console.log('topic updated with pushed post',topic);
            res.json(topic)
          }
        })
      }

    })
  }

}
module.exports = new TopicsController();
