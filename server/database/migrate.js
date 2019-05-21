import { Pool } from 'pg';
import dotenv from 'dotenv';

import createQuery from './createTables';
import dropQuery from './dropTables';

dotenv.config();

const queries = `${dropQuery}${createQuery}`;

const pool = new Pool({
  connectionString: process.env.DATABASE,
});

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
