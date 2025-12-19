import express from 'express';
import adminAuthenticate from '../controllers/adminAuthController.js';
import { getAdminCreateAccountPage, createAdminAccount, getAdminDashboardPage, getAdminLogInPage, adminLogIn } from '../controllers/adminAccountController.js';

const router = express.Router();

//api to get render admin create account page.
router.get('/api/admin-create-account', getAdminCreateAccountPage );

//router to get admin dashboard page
 router.get('/api/admin-dashboard', getAdminDashboardPage );

 //router to get admin login page.
 router.get('/api/admin-log-in', getAdminLogInPage );

 //router to handle admin login 
 router.post('/api/admin-log-in',adminAuthenticate, adminLogIn );

//api to handle admin create account.
router.post('/api/admin-create-account', createAdminAccount );

export default router;