const router = require('express').Router();
const { createUser, findUserByEmail, findUserById } = require('../db/dao/userDao');
const { registerValidation } = require('../lib/validation/userValidation');
const { userToId, userToObject } = require('../lib/converters/userConverter');


router.get('/', (req, res) => {
  res.status(200).json({text: 'getting users'});
});

router.get('/id/:id', async (req, res) => {
  const user = await findUserById(req.params.id);
  if(!user) return res.status(404).json({message: 'User not found'});
  return res.status(200).json(userToObject(user));
})

router.post('/', async (req, res) => {

  // Validate request body for required data (if needed)
  const { value: data, error } = registerValidation.validate(req.body);
  if(error) return res.status(400).json(error);

  // Check for any other conditions that shouldn't be allowed
  if(await findUserByEmail(data.email)) return res.status(400).json({message: 'Email already in use'}); 

  try {

    // Run the processes that need to be done.
    const user = await createUser(data.name, data.email, data.password);

    // set status code and return the requested data
    return res.status(200).send({message: 'Successfully created new user: ' + userToId(user).id});
  } catch {
    return res.status(500).send({message: 'Failed to create user'});
  }
});

module.exports = router;