// backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { getAllEvents, getEventDetails,getAllEventsId, ...otrosControladores } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
// Ruta para obtener eventos creados por un usuario específico
router.get('/createdBy/:userId', getAllEventsId);
router.get('/all', getAllEvents);
router.get('/:id', getEventDetails);
// router.post('/:eventId/register', authMiddleware, otrosControladores.registerToEvent);
// router.put('/:id', authMiddleware, otrosControladores.updateEvent);
// router.patch('/:id', authMiddleware, otrosControladores.changeEventStatus);
// router.patch('/:id', authMiddleware, otrosControladores.disableEvent);
// router.post('/create', authMiddleware, otrosControladores.createEvent);
router.post('/registerToEvent',  otrosControladores.registerToEvent);
router.put('/:id',  otrosControladores.updateEvent);
router.patch('/statusChange',  otrosControladores.changeEventStatus);
router.patch('/:id',  otrosControladores.disableEvent);
router.post('/create',  otrosControladores.createEvent);


module.exports = router;

