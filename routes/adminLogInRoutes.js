import express from 'express';
import { showAdminLogInPage, authenticate, adminLogIn } from "../controllers/adminLogInController.js";


const router = express.Router();

//API to render admin log in page.
router.get('/api/admin-log-in-page', showAdminLogInPage);

// API to process admin log in logic.
router.post('/api/admin-log-in',  adminLogIn, authenticate);

export default router;