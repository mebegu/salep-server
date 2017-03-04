const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title:     {type: String, required: true},
  content:   {type: String, required: true},
  image:     {type: String},
  tags:     [{type: String}],
  date:      {type: Date, default: Date.now},
  published: {type: Boolean , default: false},
  author:    {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

BlogSchema.index({date: 1});
module.exports = mongoose.model('Blog', BlogSchema);
