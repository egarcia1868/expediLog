const db = require('../models');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    db.Log.findAll().then((dbLog) => {
      res.json(dbLog);
    });
  });

  app.post('/api', function (req, res) {
    db.Log.create(req.body).then((dbLog) => {
      res.json(dbLog);
    });
  });

  app.delete('/api/logs/:id', function (req, res) {
    db.Log.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbLog) {
      res.json(dbLog);
    });
  });
};
