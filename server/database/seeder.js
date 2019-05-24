import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const createAdmin = `
  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)  VALUES('pappy', 'bear', 'Lagos', 'pappybear@gmail.com', 'password', 'true', 'verified');`;
const createUser = `
  INSERT INTO users(firstname, lastname, address, email, password, isadmin, status)
  VALUES('Obito', 'Uchiha', 'ANBU HQ', 'uchiha.obito@akatsuki.org', 'wdnkndn123', 'false', 'unverified');`;
const createLoans = `
  INSERT INTO loans(email, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest)
  VALUES('uchiha.obito@akatsuki.org', '${Date()}', 'approved', 'false', 3, 20000, 7000, 21000, 1000);`;
const createRepayment = `
  INSERT INTO repayments(createdOn, loanId, amount)
  VALUES('${Date()}', 1, 7000)`;
