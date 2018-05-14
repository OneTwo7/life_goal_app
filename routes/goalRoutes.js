const Goal = require('mongoose').model('goals');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/goals', requireLogin, async (req, res) => {
    try {
      const goals = await Goal.find({ user: req.user.id });

      res.send(goals);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/goals', requireLogin, async (req, res) => {
    const data = req.body;
    data.user = req.user.id;

    try {
      const goal = await Goal.create(data);

      res.send(goal);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.put('/api/goals/:id', requireLogin, async (req, res) => {
    try {
      let goal = await Goal.findOne({ _id: req.params.id });

      goal.completed = true;
      goal.date = new Date();

      goal = await goal.save();

      res.send(goal);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/goals/:id', requireLogin, async (req, res) => {
    try {
      await Goal.remove({ _id: req.params.id });

      res.status(200).end();
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/goals', requireLogin, async (req, res) => {
    try {
      await Goal.remove({ user: req.user.id });

      res.status(200).end();
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
