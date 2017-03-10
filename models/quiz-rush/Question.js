const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./../salep/User');


const QuestionSchema = new Schema({
  question:      {type: String, required: true},
  options:      [{type: String, required: true}],
  tags:         [{type: String}],
  status:        {type: String, required: true},
  date:          {type: Date, default: Date.now},
  correctAnswer: {type: Number, required: true},
  author:        {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

QuestionSchema.index({date: 1});

module.exports = mongoose.model('Question', QuestionSchema);
