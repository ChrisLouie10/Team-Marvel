const router = require('express').Router();
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserById } = require('../db/dao/userDao');
const { registerValidation, loginValidation } = require('../lib/validation/userValidation');
const { userToId, userToObject } = require('../lib/converters/userConverter');
const authenticate = require('../lib/passport/authenticate');


router.get('/', authenticate, (req, res) => {
  res.status(200).json({user: userToObject(req.user)});
});

router.get('/:id', authenticate, async (req, res) => {
  const user = await findUserById(req.params.id);
  if(!user) return res.status(404).json({message: 'User not found'});
  return res.status(200).json(userToObject(user));
})

router.post('/login', async (req, res) => {
  const {value: data, error } = loginValidation.validate(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  const user = await findUserByEmail(data.email)
  if(!user || !await bcrypt.compare(data.password, user.password)) return res.status(400).json({message: 'Incorrect Email or Password'});

  // jwt and cookie expires in a month
  return jwt.sign( 
    { id: user._id, name: user.name }, 
    process.env.SECRET_OR_KEY, 
    { expiresIn: 2628000 },
    (err, token) => {
      if(err) return res.status(500).json({message: "Failed to login"});
      res.cookie('token', token, { expires: new Date(Date.now + 2628000), httpOnly: true });
      return res.status(200).json({ success: true, token: token });
    }
  );
})

router.post('/', async (req, res) => {

  // Validate request body for required data (if needed)
  const { value: data, error } = registerValidation.validate(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  // Check for any other conditions that shouldn't be allowed
  if(await findUserByEmail(data.email)) return res.status(400).json({message: 'Email already in use'}); 

  try {

    // Run the processes that need to be done.
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    await console.log(data.password)
    const user = await createUser(data.name, data.email, data.password);

    // set status code and return the requested data
    return res.status(201).send(userToId(user));
  } catch {
    return res.status(500).send({message: 'Failed to create user'});
  }
});

module.exports = router;