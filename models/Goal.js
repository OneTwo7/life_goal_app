const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

mongoose.model('goals', goalSchema);
