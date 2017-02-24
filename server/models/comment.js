console.log('comment model');
var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true });
mongoose.model('Comment', CommentSchema);
