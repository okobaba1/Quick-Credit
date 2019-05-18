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
    if (email && firstName
       && lastName && password
        && address) {
      userData = {
        id: userDummyData.length, email, firstName, lastName, password, address, status: 'unverified', isAdmin: false,
      };
      userDummyData.push(userData); // copy/add to dummy data
      const token = jwt.sign({
        email,
        id: userData.id,
      }, process.env.SECRET_KEY, { expiresIn: '24hrs' });

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
      error: 'All fields are required',
    });
  }

  static login(req, res) {
    const { email, password } = req.body;
    // confirm for empty input
    if (email && password) {
      // check if email is in already signed up
      const existingUser = userDummyData.filter(user => user.email === email
        && user.password === password);
      if (existingUser.length === 1) {
        // generate token
        const token = jwt.sign({
          email,
          id: userDummyData.length,
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
      return res.status(401).json({
        status: 401,
        error: 'email/password is incorrect',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'kindly put in your email and password',
    });
  }

  static verifyUSer(req, res) {
    const { email } = req.params;
    const userToUpdate = userDummyData.filter(user => user.email === email);
    if (userToUpdate[0].status === 'unverified') {
      userDummyData.find(user => user.email === email).status = 'verified';

      return res.status(200).json({
        status: 200,
        data: {
          email,
          firstName: userToUpdate[0].firstName,
          lastName: userToUpdate[0].lastName,
          password: userToUpdate[0].password,
          address: userToUpdate[0].address,
          status: 'verified',
        },
      });
    } return res.status(401).json({
      status: 401,
      error: 'User is already verified',
    });
  }

  static superAdmin(req, res) {
    const { id } = req.params;
    const userToAdmin = userDummyData.find(user => user.isAdmin === false && user.id === Number(id));
    if (userToAdmin) {
      userDummyData.find(user => user.id === Number(id)).status = 'verified';
      return res.status(201).json({
        status: 201,
        message: 'Admin created succesfully',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }
}

export default User;
