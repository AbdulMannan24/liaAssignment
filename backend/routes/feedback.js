const express = require('express');
const { getFeedback, createFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/', getFeedback);
router.post('/create', createFeedback);

module.exports = router;