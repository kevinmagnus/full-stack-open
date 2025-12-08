import {  createAdminAccount, showAdminCreateAccountPage } from "../controllers/adminCreateAccountController.js";
import express from "express";

const router = express.Router();

router.post('/api/admin-create-account', createAdminAccount);

router.get('/api/admin-create-account', showAdminCreateAccountPage);

export default router;