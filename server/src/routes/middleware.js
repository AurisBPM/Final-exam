/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Token is bad' });
    }
  },
};
