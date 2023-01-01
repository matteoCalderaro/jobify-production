import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  // Mongoose middleware (see model)
  const user = await User.create({ name, email, password });
  // Custom Instance Methods (see model)
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.CREATED).json({
    // the user object has to being destructed because the SchemaType.prototype.select doesn't work with the method create()
    user,
    // : {
    //   name: user.name,
    //   email: user.email,
    //   lastName: user.lastName,
    //   location: user.location,
    // }
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError('Not user with this email');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Password');
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { email, name, lastName, location },
    { new: true, runValidators: true, context: 'query' }
  );

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
