const { Ticket } = require('../models');

module.exports = {
  checkAvailableSeat(req, res, next) {
    if (req.body.passengers && req.body.passengers.length > 0) {
      const promises = req.body.passengers.map((passenger) => Ticket.findOne({
        where: {
          departure_date: req.body.departure_date,
          departure_time: req.body.departure_time,
          departure_location: req.body.departure_location,
          destination: req.body.destination,
          seat_number: passenger.seat,
        },
      }));

      Promise.all(promises)
        .then((passengers) => {
          const isSeatTaken = passengers.some((passenger) => passenger !== null);
          if (isSeatTaken) {
            res.status(400).send({
              status: 'fail',
              seat_number: req.body.seat,
              message: 'Seat is already taken!',
            });
          } else {
            next();
          }
        })
        .catch((error) => {
          res.status(500).send({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
          });
        });
    } else {
      next();
    }
  },
};
