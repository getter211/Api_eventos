// backend/controllers/eventController.js
const { Event, User, Registration } = require('../models');

const { Op } = require('sequelize'); // Asegúrate de importar Op de Sequelize

exports.createEvent = async (req, res) => {
  const { name, date, time, description, guest, cost, latitude, longitude, location, createdBy } = req.body;

  try {
    const event = await Event.create({
      name,
      date,
      time,
      description,
      guest,
      cost,
      latitude,
      longitude,
      location,
      createdBy, // Utiliza el valor enviado en el cuerpo de la solicitud
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
}
};


exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, time, description, guest, cost, latitude, longitude, status } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({ name, date, time, description, guest, cost, latitude, longitude, status });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
}
};

exports.disableEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({ status: 'disabled' });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAllEvents = async (req, res) => {
  try {
    // Obtener la fecha actual
    const now = new Date();

    // Encontrar todos los eventos
    const events = await Event.findAll({ include: [User, Registration] });

    // Crear una lista de IDs de eventos que deben ser actualizados
    const eventIdsToUpdate = events
      .filter(event => {
        // Combinar la fecha y hora del evento en un solo objeto Date
        const eventDate = new Date(event.date);
        const eventTime = event.time; // Se espera que sea una cadena como 'HH:mm:ss'

        // Solo si eventTime tiene un valor válido
        if (eventTime) {
          const [hours, minutes, seconds] = eventTime.split(':').map(Number);
          eventDate.setHours(hours, minutes, seconds);
        }

        // Verificar si la fecha y hora del evento ya pasaron
        return eventDate < now;
      })
      .map(event => event.id);

    // Si hay eventos que actualizar, actualiza su estado
    if (eventIdsToUpdate.length > 0) {
      await Event.update(
        { status: 'completed' },
        {
          where: {
            id: {
              [Op.in]: eventIdsToUpdate
            },
            status: {
              [Op.ne]: 'completed' // Solo actualiza si el estado no es ya 'completed'
            }
          }
        }
      );
    }

    // Volver a obtener todos los eventos con el estado actualizado
    const updatedEvents = await Event.findAll({ include: [User, Registration] });

    res.status(200).json(updatedEvents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEventDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id, {
      include: [
        {
          model: User,
          as: 'createdByUser', // Asegúrate de que este alias coincida con el definido en el modelo de Evento
        },
        Registration, // Si también quieres incluir las registraciones
      ],
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.changeEventStatus = async (req, res) => {
  const { id, status } = req.body; // Obtener eventId y userId del cuerpo de la solicitud

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update({ status });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllEventsId = async (req, res) => {
  const { userId } = req.params; // Obtener el userId de los parámetros de la URL

  try {
    let whereClause = {}; // Condición inicial para findAll

    if (userId) {
      whereClause = { createdBy: userId }; // Filtrar por el ID del usuario que creó el evento
    }

    const events = await Event.findAll({
      where: whereClause,
      include: [User, Registration],
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerToEvent = async (req, res) => {
  const { eventId, userId } = req.body; // Obtener eventId y userId del cuerpo de la solicitud

  try {
    // Verificar si el evento existe
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Comprobar si el usuario ya está registrado en el evento
    const registration = await Registration.findOne({
      where: { eventId, userId }
    });

    if (registration) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }

    // Registrar al usuario en el evento
    await Registration.create({ eventId, userId });
    res.status(200).json({ message: 'User registered successfully to event' });
  } catch (error) {
    res.status(400).json({ error: error.message });
} //eso naranja que viste son campos invisibkles que desopes rte daran erroes
};
// No muevas nada we 
// ya murio la api tienes que reiniciarlo cuando se muere YA SWEEEEEEEEEEEEEEEEEEEEEEEEE
// Función para obtener todos los eventos con detalles