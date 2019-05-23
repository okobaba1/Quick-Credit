import '@babel/polyfill';
import bcrypt from 'bcrypt';
import db from './dbconnection';

const Migration = {
  async migrate() {
    try {
      console.log('Dropping users table');
      await db.query('DROP TABLE IF EXISTS users CASCADE');

      console.log('Dropping loans table');
      await db.query('DROP TABLE IF EXISTS loans CASCADE');

      console.log('Dropping repayments table');
      await db.query('DROP TABLE IF EXISTS repayments CASCADE');

      console.log('Creating User table');
      await db.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        password TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unverified',
        isadmin BOOLEAN DEFAULT false
      );
    `);

      console.log('Creating Loan table');
      await db.query(`
      CREATE TABLE IF NOT EXISTS loans(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status DEFAULT 'pending',
        repaid BOOLEAN DEFAULT false,
        tenor INTEGER NOT NULL,
        amount FLOAT NOT NULL,
        paymentInstallment FLOAT NOT NULL,
        balance FLOAT NOT NULL,
        interest FLOAT NOT NULL
      );
    `);

      console.log('Creating repayment table');
      await db.query(`
      CREATE TABLE IF NOT EXISTS repayments(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        loanId INTEGER REFERENCES loans(id) on DELETE CASCADE,
        amount FLOAT NOT NULL
      );
    `);

      const adminQuery = `INSERT INTO
    users(email, firstname, lastname, address, password, status, isAdmin)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING email, firstName, lastName, address, status, isAdmin`;
      const values = [
        'Admin',
        'victor',
        'victoradmin@quickcredit.com',
        bcrypt.hash('password', 10),
        '1, Quick Credit Avenue',
        '2, Quick Credit Complex',
        'verified',
        true,
      ];
      console.log('Creating Admin');
      await db.query(adminQuery, values);
      console.log('Admin Created');
    } catch (error) {
      console.log(error);
    }
  },
};

export default Migration;

Migration.migrate();
