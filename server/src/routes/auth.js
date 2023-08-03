const express = require('express');
const mysql = require('mysql2');
const joi = require('joi');
const bcrypt = require('bcrypt');
const DB_CONFIG = require('../config/db-config');

const router = express.Router();
const mysqlPool = mysql.createPool(DB_CONFIG).promise();

const authSchema = joi.object({
  email: joi.string().email().trim().lowercase()
    .required(),
  password: joi.string()
    .required(),
});

router.post('/register', async (req, res) => {
  let payload = req.body;
  console.log(payload);
  try {
    payload = await authSchema.validateAsync(payload);
  } catch (err) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await mysqlPool.execute('INSERT INTO auth ( email, password ) VALUES (?, ? )', [payload.email, encryptedPassword]);
    return res.status(200).json(response);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry' });
    }
    return res.status(500).end();
  }
});

module.exports = router;
