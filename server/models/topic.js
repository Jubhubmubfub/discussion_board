console.log('topic model');
var mongoose = require('mongoose');
var TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {type:String, required: true},
  user: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  posts: [{type:mongoose.Schema.Types.ObjectId,ref:'Post'}],
  description: {type:String,required:true}
}, {timestamps: true });
mongoose.model('Topic', TopicSchema);
