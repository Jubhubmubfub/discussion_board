console.log('post model');
var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
  upvotes: {type:Number, default:0, required: true},
  downvotes: {type:Number, default:0, required: true},
}, {timestamps: true });
mongoose.model('Post', PostSchema);
