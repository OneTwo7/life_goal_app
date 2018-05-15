const mongoose = require('mongoose');
const Timer = mongoose.model('timers');
const Record = mongoose.model('records');
const requireLogin = require('../middlewares/requireLogin');

const getTimerIds = async (user) => {
  const timers = await Timer.find({ user: user });
  return timers.map(timer => timer._id);
};

module.exports = (app) => {
  app.get('/api/records', requireLogin, async (req, res) => {

    try {
      const timerIds = await getTimerIds(req.user.id);

      const records = await Record.find({ timer: { $in: timerIds } });

      res.send(records);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/records', requireLogin, async (req, res) => {
    const data = req.body;

    try {
      const record = await Record.create(data);

      res.send(record);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/records', requireLogin, async (req, res) => {
    try {
      const timerIds = await getTimerIds(req.user.id);

      await Record.remove({ timer: { $in: timerIds } });

      res.status(200).end();
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
