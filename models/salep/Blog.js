const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
        title: {type: String},
        content: {type: String},
        author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
        image: {type: String},
        tags: [{type: String}],
        date: {type: Date, default: Date.now},
        isPublished: {type: Boolean},
});

BlogSchema.index({date: 1});
module.exports = mongoose.model('Blog', BlogSchema);
