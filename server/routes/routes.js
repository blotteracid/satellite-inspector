const sat = require('./../sat');

const appRouter = app => {
  app.post('/getSatelliteData', (req, res) => {
    const result = sat(req.body);

    res.status(200).send(result);
  });
}

module.exports = appRouter;
