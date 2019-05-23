import db from './dbconnection';

const Migration = {
  async migrate() {
    try {
      await db.query('DROP TABLE IF EXISTS users CASCADE');


      await db.query('DROP TABLE IF EXISTS loans CASCADE');


      await db.query('DROP TABLE IF EXISTS repayments CASCADE');


      await db.query(`
    CREATE TABLE IF NOT EXISTS 
    users(
        id SERIAL UNIQUE PRIMARY KEY,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        "homeAddress" VARCHAR(100) NOT NULL,
        "workAddress" VARCHAR(100) NOT NULL,
        status TEXT DEFAULT ('unverified'),
        "isAdmin" BOOLEAN DEFAULT false,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

      logger('Creating Loan table');
      await db.query(`
    CREATE TABLE IF NOT EXISTS 
    loans (
      id SERIAL UNIQUE PRIMARY KEY,
      "userMail" VARCHAR(100) REFERENCES users (email) ON DELETE CASCADE,
      tenor SMALLINT NOT NULL,
      status TEXT DEFAULT ('pending'),
      repaid BOOLEAN DEFAULT false,
      amount NUMERIC NOT NULL,
      interest NUMERIC NOT NULL,
      "paymentInstallment" NUMERIC NOT NULL,
      balance NUMERIC NOT NULL,
      "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

      logger('Creating repayment table');
      await db.query(`
    CREATE TABLE IF NOT EXISTS 
    repayments(
        id SERIAL UNIQUE PRIMARY KEY,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "loanId" INT REFERENCES loans (id) ON DELETE CASCADE,
        amount NUMERIC NOT NULL
    );
    `);

      const createAdminQuery = `INSERT INTO 
    users("firstName", "lastName", email, password, "homeAddress", "workAddress", status, "isAdmin")
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
    RETURNING "firstName", "lastName", email, "homeAddress", "workAddress", status, "isAdmin"`;
      const values = [
        'Admin',
        'Quickcredit',
        'admin@quickcredit.com',
        helper.hashPassword('quickcreditsecret10'),
        '1, Quick Credit Avenue',
        '2, Quick Credit Complex',
        'verified',
        true,
      ];
      logger('Creating Admin');
      await db.query(createAdminQuery, values);
      logger('Admin Created');
    } catch (error) {
      logger(error);
    }
  },
};

export default Migration;

Migration.migrate();
