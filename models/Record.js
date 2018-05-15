const mongoose = require('mongoose');
const { Schema } = mongoose;

const thisMonth = (() => new Date().getMonth());

const thisDate = (() => new Date().getDate());

const recordSchema = new Schema({
  timer: { type: Schema.Types.ObjectId, ref: 'Timer'},
  month: { type: Number, default: thisMonth },
  date:  { type: Number, default: thisDate },
  duration: { type: Number, default: 0 }
});

mongoose.model('records', recordSchema);
