const Trip = require('../models/Trip');

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [
        { createdBy: req.user._id },
        { 'members.userId': req.user._id }
      ]
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrip = async (req, res) => {
  const { name, description } = req.body;

  try {
    const trip = new Trip({
      name,
      description,
      members: [{
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: 'admin'
      }],
      createdBy: req.user._id,
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrips, createTrip };