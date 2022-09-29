import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/', UserController.home);
router.route('/login').get( UserController.login).post(UserController.verifyUser);
router.route('/registration').get(UserController.registration).post(UserController.createUserDoc);

export default router;