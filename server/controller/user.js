/* eslint-disable linebreak-style */
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
    // check if user exists
    if (existingUser.length) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    // Confirm for empty requests
    if (email.length && firstName.length
       && lastName.length && password.length
        && address.length && status.length) {
      userData = {
        email, firstName, lastName, password, address, status, userType: 1,
      };
      userDummyData.push(userData); // copy/add to dummy data
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

  static login(req, res) {
    const { email, password } = req.body;
    // confirm for empty input
    if (email.length && password.length) {
      // check if email is in already signed up
      const existingUser = userDummyData.filter(user => user.email === email
        && user.password === password);
      if (existingUser.length === 1) {
        // generate token
        const token = jwt.sign({
          email,
          id: userDummyData.length,
          userType: 2,
        }, process.env.SECRET_KEY, { expiresIn: '72hrs' });
        const { firstName } = existingUser[0];
        const { lastName } = existingUser[0];
        const { id } = existingUser[0];
        return res.status(200).json({
          status: 200,
          data: {
            message: 'login successsful',
            token,
            id,
            firstName,
            lastName,
            email,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'email/password is incorrect',
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'kindly put in your email and password',
    });
  }

  // static verifyUSer(req, res) {
  //   const { email } = req.params;
  //   const userToUpdate = userDummyData.filter(user => user.email === email);
  //   if (userToUpdate[0].status === 'unverified') {
  //     userToUpdate[0].status = 'verified';
  //     const {
  //       status, firstName, lastName, address,
  //     } = userToUpdate[0];
  //     return res.status(200).json({
  //       status: 200,
  //       data: {
  //         email,
  //         firstName,
  //         lastName,
  //         address,
  //         status,
  //       },
  //     });
  //   } return res.status(401).json({
  //     status: 401,
  //     error: 'you are not authorized to perform this operation',
  //   });
  // }
}
export default User;
