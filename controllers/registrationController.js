// backend/controllers/registrationController.js
const { Registration, Event, User } = require('../models');

exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user

  try {
    const registration = await Registration.create({ eventId, userId });
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEventRegistrations = async (req, res) => {
  const { eventId } = req.params;

  try {
    const registrations = await Registration.findAll({
      where: { eventId },
      include: [User], // Asumiendo que quieres incluir detalles del usuario
    });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
