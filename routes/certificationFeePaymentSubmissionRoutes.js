import express from "express";
import { getFrontEndWebDevelopmentCertificationFeeSubmissionPage, getBackEndWebDevelopmentCertificationFeeSubmissionPage, getFullStackWebDevelopmentCertificationFeeSubmissionPage, getCybersecurityCertificationFeeSubmissionPage, getBlockchainDevelopmentCertificationFeeSubmissionPage  } from '../controllers/certificationFeePaymentSubmissionControllers.js';

const router = express.Router();

//router to get certification fee submission page.
router.get('/api/front-end-web-development-certification-fee-submission', getFrontEndWebDevelopmentCertificationFeeSubmissionPage  );


router.get('/api/back-end-web-development-certification-fee-submission', getBackEndWebDevelopmentCertificationFeeSubmissionPage  );

router.get('/api/full-stack-web-development-certification-fee-submission', getFullStackWebDevelopmentCertificationFeeSubmissionPage  );

router.get('/api/cybersecurity-certification-fee-submission', getCybersecurityCertificationFeeSubmissionPage  );

router.get('/api/blockchain-development-certification-fee-submission', getBlockchainDevelopmentCertificationFeeSubmissionPage );




export default router;