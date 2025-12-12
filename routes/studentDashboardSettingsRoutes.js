import express from "express";
import { getStudentDashboardSettingsPage } from "../controllers/studentDashboardSettingsControllers.js";

const router = express.Router();


router.get('/student-dashboard-setting', getStudentDashboardSettingsPage);


export default router;