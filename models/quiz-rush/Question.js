const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
        question: {type: String, required: true},
        options: [{type: String, required: false}],
        correctAnswer: {type: Number, required: false, unique: true},
        author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
        date: {type: Date, default: Date.now},
         status: {type: String, required: true},
        tags: [{type: String, required: false}],
});

QuestionSchema.index({date: 1});

module.exports = mongoose.model('Question', QuestionSchema);
