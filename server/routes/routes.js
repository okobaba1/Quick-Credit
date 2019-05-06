import express from 'express';
import User from '../controller/user';

const router = express.Router();

router.post('/auth/signup', User.createUser);


export default router;
