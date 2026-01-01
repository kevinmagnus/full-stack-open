import { getAllStudentsData, getStudentsDataPage } from "../controllers/adminStudentsController.js";
import express from "express";
import authenticateAdmin from "../controllers/adminAuthController.js";


const router = express.Router();

//router to render get all students page.
router.get('/api/get-all-students-data',authenticateAdmin, getStudentsDataPage);

//router to get handle all students
router.get('/api/display-all-students-data',authenticateAdmin, getAllStudentsData);



export default router;