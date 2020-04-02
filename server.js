const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
