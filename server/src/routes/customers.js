/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mysql = require('mysql2');
const DB_CONFIG = require('../config/db-config');
const { authenticate } = require('./middleware');

const router = express.Router();
const mysqlPool = mysql.createPool(DB_CONFIG).promise();

router.post('/customers', authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const [response] = await mysqlPool.execute(
      'INSERT INTO customers (full_name, email, dob, auth_id) VALUES (?, ?, ?, ?)',
      [payload.full_name, payload.email, payload.dob, payload.auth_id],
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/customers', authenticate, async (req, res) => {
  try {
    const [customers] = await mysqlPool.execute('SELECT * FROM customers');
    return res.json(customers);
  } catch (error) {
    return res.status(500).end();
  }
});

router.delete('/customers/:customer_id', authenticate, async (req, res) => {
  try {
    const customerId = req.params.customer_id;
    const [request] = await mysqlPool.execute(
      `DELETE FROM customers WHERE id = ${customerId}`,
    );
    return res.json(request);
  } catch (error) {
    return res.status(500).end();
  }
});

router.put('/customers/:customer_id', authenticate, async (req, res) => {
  try {
    const [customer] = await mysqlPool.query('SELECT id FROM customers WHERE id=?', [
      req.params.customer_id,
    ]);

    if (customer.length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Customer does not exist!',
      });
    }

    const payload = req.body;

    const [response] = await mysqlPool.query('UPDATE customers SET ? WHERE id=?', [
      payload,
      req.params.customer_id,
    ]);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).end();
  }
});

module.exports = router;
