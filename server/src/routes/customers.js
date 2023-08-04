const express = require('express');
const mysql = require('mysql2');
const DB_CONFIG = require('../config/db-config');

const router = express.Router();
const mysqlPool = mysql.createPool(DB_CONFIG).promise();

router.post('/customers', async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const [response] = await mysqlPool.execute('INSERT INTO customers (full_name, email, dob, auth_id) VALUES (?, ?, ?, ?)', [payload.full_name, payload.email, payload.dob, payload.auth_id]);
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
