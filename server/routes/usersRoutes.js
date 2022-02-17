const express = require('express');
const router = express.Router();
const { createUser } = require('../db/dao/userDao');


router.get('/', (req, res) => {
  res.send("getting users");
});

router.get('/create', async (req, res) => {
  const user = await createUser(req.query.name, req.query.email);
  res.send(user);
});

module.exports = router;