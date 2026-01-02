import express from "express";
import { getFrontEndWebDevelopmentCertificationFeeSubmissionPage, updateCybersecurityPayment, updateBlockchainDevelopmentPayment, updateBackEndPayment, updateFullStackPayment, updateFrontEndPayment, getBackEndWebDevelopmentCertificationFeeSubmissionPage, getFullStackWebDevelopmentCertificationFeeSubmissionPage, getCybersecurityCertificationFeeSubmissionPage, getBlockchainDevelopmentCertificationFeeSubmissionPage  } from '../controllers/certificationFeePaymentSubmissionControllers.js';

const router = express.Router();

//router to get certification fee submission page.
router.get('/api/front-end-web-development-certification-fee-submission', getFrontEndWebDevelopmentCertificationFeeSubmissionPage  );

router.post('/api/front-end-web-development-certification-fee-submission', updateFrontEndPayment );


router.get('/api/back-end-web-development-certification-fee-submission', getBackEndWebDevelopmentCertificationFeeSubmissionPage  );

router.post('/api/back-end-web-development-certification-fee-submission', updateBackEndPayment  );


router.get('/api/full-stack-web-development-certification-fee-submission', getFullStackWebDevelopmentCertificationFeeSubmissionPage  );

router.post('/api/full-stack-web-development-certification-fee-submission', updateFullStackPayment  );


router.get('/api/cybersecurity-certification-fee-submission', getCybersecurityCertificationFeeSubmissionPage  );

router.post('/api/cybersecurity-certification-fee-submission', updateCybersecurityPayment );


router.get('/api/blockchain-development-certification-fee-submission', getBlockchainDevelopmentCertificationFeeSubmissionPage );

router.post('/api/blockchain-development-certification-fee-submission', updateBlockchainDevelopmentPayment );




export default router;