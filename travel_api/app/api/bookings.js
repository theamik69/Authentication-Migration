const { nanoid } = require('nanoid');
const { Price } = require('../models');
const { Booking } = require('../models');
const { Passenger } = require('../models');
const { Ticket } = require('../models');

module.exports = {

  add(req, res) {
    Price.findOne({
      where: {
        departure: req.body.departure_location,
        destination: req.body.destination,
      },
    })
      .then((price) => {
        if (!price) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'Price not found for the given departure location and destination.',
          });
        }

        const bookingId = `booking-${nanoid(12)}`;
        const ticketPrice = price.price;
        const passengerCount = req.body.passenger_count;
        const totalPrice = ticketPrice * passengerCount;

        return Booking.create({
          id: bookingId,
          user_id: req.body.userid,
          departure_date: req.body.departure_date,
          departure_time: req.body.departure_time,
          departure_location: req.body.departure_location,
          destination: req.body.destination,
          passenger_count: passengerCount,
          total_price: totalPrice,
        });
      })
      .then((booking) => {
        const bookingId = booking.id;
        const totalPrice = booking.total_price;
        const passengerCount = booking.passenger_count;
        const ticketPrice = totalPrice / passengerCount;

        if (req.body.passengers && req.body.passengers.length > 0) {
          const passengerPromises = req.body.passengers.map((passenger) => Passenger.create({
            booking_id: bookingId,
            full_name: passenger.full_name,
          }));

          return Promise.all(passengerPromises)
            .then((passengers) => {
              const passengerIds = passengers.map((passenger) => passenger.id);

              const ticketPromises = passengerIds.map((passengerId, index) => Ticket.create({
                booking_id: bookingId,
                passenger_id: passengerId,
                passenger_name: req.body.passengers[index].full_name,
                departure_date: req.body.departure_date,
                departure_time: req.body.departure_time,
                departure_location: req.body.departure_location,
                destination: req.body.destination,
                ticket_price: ticketPrice,
                seat_number: req.body.passengers[index].seat,
              }));

              return Promise.all(ticketPromises);
            })
            .then(() => {
              const response = {
                status: 'success',
                id: booking.id,
                message: 'The reservation is successful!',
              };
              return res.status(201).send(response);
            })
            .catch((error) => {
              throw error;
            });
        }
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  listBookingUser(req, res) {
    return Booking
      .findAll({
        include: [],
        where: {
          user_id: req.params.userid,
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((docs) => {
        const statuses = {
          status: 'success',
          count: docs.length,
          confirmed_reservation: docs.map((doc) => doc),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  getBookingById(req, res) {
    return Booking
      .findOne({
        where: {
          id: req.params.bookingid,
        },
        include: [
          {
            model: Ticket,
            as: 'tickets',
          },
        ],
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'Status Not Found',
          });
        }
        const status = {
          status: 'success',
          id: doc.id,
          totalPrice: doc.total_price,
          ticket: doc.tickets,
          errors: null,
        };
        return res.status(200).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

};
