import jwt from 'jsonwebtoken';
import moment from 'moment';
// import uuid from 'uuid';
import bcrypt from 'bcrypt';
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    const createQuery = {
      text: 'INSERT INTO users(email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [email, firstName, lastName, hashedPassword, address],
    };

    try {
      const { rows } = await db.query(checkUser);
      if (rows[0]) {
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

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'kindly put in your email and password',
      });
    }
    const { email, password } = req.body;
    const checkUser = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    try {
      const { rows } = await db.query(checkUser);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'Please sign Up',
        });
      } bcrypt.compare(password, rows[0].password, (error, response) => {
        if (!response) {
          return res.status(401).json({
            status: 401,
            error: 'Incorrect password',
          });
        } const token = jwt.sign({
          email,
          id: rows[0].id,
          isAdmin: rows[0].isadmin,
        }, process.env.SECRET_KEY, { expiresIn: '1024hrs' });
        return res.status(200).json({
          status: 200,
          message: 'login successsful',
          data: {
            token,
            id: rows[0].id,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            email: rows[0].email,
          },
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },

  async verify(req, res) {
    const { email } = req.params;
    const checkUser = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    try {
      const { rows } = await db.query(checkUser);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Not a registered email',
        });
      }
      if (rows[0].status === 'verified') {
        return res.status(401).json({
          status: 401,
          error: 'User is already verified',
        });
      }
      const update = {
        text: "UPDATE users SET status = 'verified' WHERE email = $1 RETURNING *",
        values: [email],
      };
      const { rows: rowsUpdate } = await db.query(update);
      return res.status(201).json({
        status: 201,
        data: {
          email,
          firstName: rowsUpdate[0].firstname,
          lastName: rowsUpdate[0].lastname,
          address: rowsUpdate[0].address,
          status: rowsUpdate[0].status,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Internal server error ${error.message}`,
      });
    }
  },
  async superAdmin(req, res) {
    const { id } = req.params;
    const checkUser = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    try {
      const { rows } = await db.query(checkUser);

      if (rows[0]) {
        const update = {
          text: 'UPDATE users SET isAdmin = TRUE WHERE id = $1 RETURNING *',
          values: [id],
        };
        await db.query(update);
        return res.status(200).json({
          status: 200,
          message: 'Created Admin',
          email: rows[0].email,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Not a Registered User',
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
