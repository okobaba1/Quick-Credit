import jwt from 'jsonwebtoken';
import userDummyData from '../dummyData/auth';

class User {
  static createUser(req, res) {
    const {
      email,
      firstName,
      lastName,
      password,
      address,
      status,
    } = req.body;
    let userData = {};
    const existingUser = userDummyData.filter(user => user.email === email);

    if (existingUser.length) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    if (email.length && firstName.length
       && lastName.length && password.length
        && address.length && status.length) {
      userData = {
        email, firstName, lastName, password, address, status, userType: 1,
      };
      userDummyData.push(userData);
      const token = jwt.sign({
        email,
        id: userDummyData.length,
        userType: 1,
      }, process.env.SECRET_KEY, { expiresIn: '72hrs' });

      return res.status(201).json({
        status: 'Success',
        data: {
          id: userDummyData.length,
          email,
          firstName,
          lastName,
          token,
        },
      });
    }
    return res.status(400).json({
      status: 'Fail',
      message: 'All fields are required',
    });
  }
}

export default User;
