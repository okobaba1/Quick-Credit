import jwt from 'jsonwebtoken';
import moment from 'moment';
// import uuid from 'uuid';
import db from '../database/dbconnection';

const Users = {
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Some values are missing',
      });
    }
    const {
      email, firstName, lastName, password, address,
    } = req.body;

    const checkUser = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    const createQuery = {
      text: 'INSERT INTO users(email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [email, firstName, lastName, password, address],
    };

    try {
      const { rows } = await db.query(checkUser);
      if (rows.length) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      }
      const { rows: userRows } = await db.query(createQuery);
      const { id, isAdmin } = userRows[0];
      const token = jwt.sign({
        email,
        id,
        isAdmin,
      }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
      return res.status(201).json({
        status: 201,
        token,
        data: {
          id,
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },
};
export default Users;
