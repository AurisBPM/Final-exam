const express = require('express');

const router = express.Router();

router.post('/register', async (req, res) => {
  const payload = req.body;
  try {
    console.log(payload);
  } catch (err) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    return res.status(200).end();
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry' });
    }
    return res.status(500).end();
  }
});

module.exports = router;
