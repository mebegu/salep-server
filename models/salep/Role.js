const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  label:     {type: String, required: true, unique: true},
  accessible:   [{type: String, required: true}],
  date:      {type: Date, default: Date.now}
});
module.exports = mongoose.model('Role', RoleSchema);