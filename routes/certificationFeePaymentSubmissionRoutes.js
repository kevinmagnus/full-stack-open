import express from "express";
import { getFrontEndWebDevelopmentCertificationFeeSubmissionPage, updateFrontEndPayment, getBackEndWebDevelopmentCertificationFeeSubmissionPage, getFullStackWebDevelopmentCertificationFeeSubmissionPage, getCybersecurityCertificationFeeSubmissionPage, getBlockchainDevelopmentCertificationFeeSubmissionPage  } from '../controllers/certificationFeePaymentSubmissionControllers.js';

const router = express.Router();

//router to get certification fee submission page.
router.get('/api/front-end-web-development-certification-fee-submission', getFrontEndWebDevelopmentCertificationFeeSubmissionPage  );

router.post('/api/front-end-web-development-certification-fee-submission', updateFrontEndPayment );


router.get('/api/back-end-web-development-certification-fee-submission', getBackEndWebDevelopmentCertificationFeeSubmissionPage  );

router.get('/api/full-stack-web-development-certification-fee-submission', getFullStackWebDevelopmentCertificationFeeSubmissionPage  );

router.get('/api/cybersecurity-certification-fee-submission', getCybersecurityCertificationFeeSubmissionPage  );

router.get('/api/blockchain-development-certification-fee-submission', getBlockchainDevelopmentCertificationFeeSubmissionPage );




export default router;