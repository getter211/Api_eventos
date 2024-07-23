// backend/routes/registrationRoutes.js
const express = require('express');
const { registerForEvent, getEventRegistrations } = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de que este archivo y middleware existan
const router = express.Router();

// router.post('/register', authMiddleware, registerForEvent);
// router.get('/event/:eventId/registrations', authMiddleware, getEventRegistrations);
router.post('/register',  registerForEvent);
router.get('/event/:eventId/registrations', getEventRegistrations);
module.exports = router;
