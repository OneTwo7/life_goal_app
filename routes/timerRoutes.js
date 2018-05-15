const mongoose = require('mongoose');
const Timer = mongoose.model('timers');
const Record = mongoose.model('records');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/timers', requireLogin, async (req, res) => {
    try {
      const timers = await Timer.find({ user: req.user.id });

      res.send(timers);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/timers', requireLogin, async (req, res) => {
    const data = req.body;
    data.user = req.user.id;

    try {
      const timer = await Timer.create(data);

      res.send(timer);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.put('/api/timers/:id', requireLogin, async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try {
      let timer = await Timer.findOne({ _id: id });

      if (!data.start) {
        timer.start = new Date();
        timer.running = true;
      } else {
        timer.running = false;

        const time = new Date();
        let record = await Record.findOne({
          timer: id, month: time.getMonth(), date: time.getDate()
        });
        record.duration += time - timer.start;
        await record.save();
      }

      timer = await timer.save();

      res.send(timer);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/timers/:id', requireLogin, async (req, res) => {
    try {
      await Timer.remove({ _id: req.params.id });

      await Record.remove({ timer: req.params.id });

      res.status(200).end();
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
