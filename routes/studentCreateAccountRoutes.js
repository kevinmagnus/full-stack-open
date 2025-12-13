import express from "express";
import { createStudentAccount, getStudentCreateAccountPage } from "../controllers/createStudentAccountControllers.js";


const router = express.Router();


router.get('/Create-Account', getStudentCreateAccountPage);

router.post('/api/Sign-Up', createStudentAccount);


export default router;
