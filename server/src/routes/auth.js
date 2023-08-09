const express = require('express');
const mysql = require('mysql2');
const joi = require('joi');
const bcrypt = require('bcrypt');
const DB_CONFIG = require('../config/db-config');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const mysqlPool = mysql.createPool(DB_CONFIG).promise();

const authSchema = joi.object({
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().required(),
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
    const [response] = await mysqlPool.execute(
      'INSERT INTO users ( email, password ) VALUES ( ?, ? )',
      [payload.email, encryptedPassword]
    );
    return res.status(200).json(response);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Duplicate entry' });
    }
    return res.status(500).end();
  }
});

router.post('/login', async (req, res) => {
  let payload = req.body;
  try {
    payload = await loginSchema.validateAsync(payload);
  } catch (error) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const [data] = await mysqlPool.execute(
      `
          SELECT * FROM auth
          WHERE email = ?
      `,
      [payload.email]
    );

    if (!data.length) {
      return res.status(400).send({ error: 'Email or password did not match' });
    }

    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email: data[0].email,
          id: data[0].id,
        },
        process.env.JWT_SECRET,
      );
      return res.status(200).send({ token });
    }

    return res.status(400).send({ error: 'Email or password did not match' });
  } catch (error) {
    return res.status(500).end();
  }
});

module.exports = router;
