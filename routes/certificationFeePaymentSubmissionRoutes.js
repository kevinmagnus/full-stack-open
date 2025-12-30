import express from "express";
import getFrontEndWebDevelopmentCertificationFeeSubmissionPage  from '../controllers/certificationFeePaymentSubmissionControllers.js';

const router = express.Router();

//router to get certification fee submission page.
router.get('/api/front-end-web-development-certification-fee-submission', getFrontEndWebDevelopmentCertificationFeeSubmissionPage  );

export default router;