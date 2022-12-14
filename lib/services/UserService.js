const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({  email, firstName, lastName, password }) {
    const passwordHash = await bcrypt.hash(
      password, Number(process.env.SALT_ROUNDS)
    );
    console.log(passwordHash);
    const user = await User.insert({
      email, firstName, lastName, passwordHash
    }); return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);
      if(!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invaild password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
