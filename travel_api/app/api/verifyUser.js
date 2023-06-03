const { User } = require('../models');
const { Booking } = require('../models');

module.exports = {

  verifyUser(req, res, next) {
    User.findOne({
      where: {
        id: req.body.userid,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          status: 'fail',
          id: req.body.userid,
          message: 'User Not Found.',
        });
      }
      next();
    });
  },

  verifyUserBooking(req, res, next) {
    Booking.findOne({
      where: {
        id: req.params.bookingid,
        user_id: req.params.userid,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          status: 'fail',
          message: 'forbidden access',
        });
      }
      next();
    });
  },
};
