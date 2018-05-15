const mongoose = require('mongoose');
const { Schema } = mongoose;

const timerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  running: { type: Boolean, default: false },
  start: { type: Date, default: null }
});

mongoose.model('timers', timerSchema);
