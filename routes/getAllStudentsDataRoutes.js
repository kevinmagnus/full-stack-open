import express from 'express';
import { getAllStudentsData } from '../controllers/showAllStudentsControllers.js';

const router = express.Router();

router.get('/api/get-all-students-data', getAllStudentsData);

export default router;