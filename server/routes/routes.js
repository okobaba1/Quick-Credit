import express from 'express';
import User from '../controller/user';

const router = express.Router();

router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.login);


export default router;
