import { Pool } from 'pg';
import dotenv from 'dotenv';

import createTables from './createTables';
import dropTables from './dropTables';

dotenv.config();

const createAdmin = `
  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)  VALUES('Desmond', 'Edem', 'Sabo', 'meetdesmond.edem@gmail.com', 'hydwkw345', 'true', 'verified');`;
const createUser = `
  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)
  VALUES('Obito', 'Uchiha', 'ANBU HQ', 'uchiha.obito@akatsuki.org', 'wdnkndn123', 'false', 'unverified');`;
const createLoans = `
  INSERT INTO loans(email, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest)
  VALUES('uchiha.obito@akatsuki.org', '${Date()}', 'approved', 'false', 3, 20000, 7000, 21000, 1000);`;
const createRepayment = `
  INSERT INTO repayments(createdOn, loanId, amount)
  VALUES('${Date()}', 1, 7000)`;

const queries = `${dropTables}${createTables}${createAdmin}${createUser}${createLoans}${createRepayment}`;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.query(queries)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
