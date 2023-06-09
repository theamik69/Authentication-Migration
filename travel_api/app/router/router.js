const verifySignUpController = require('../api/verifySignUp');
const userController = require('../api/user');
const bookingController = require('../api/bookings');
const verifyJwtTokenController = require('../api/verifyJwtToken');
const verifyAvailableSeat = require('../api/verifySeat');
const verifyUser = require('../api/verifyUser');

module.exports = function (app) {
  app.post(
    '/registration',
    verifySignUpController.checkDuplicateUserNamePhoneAndEmail,
    userController.signup,
  );

  app.post('/signin', userController.signin);

  app.post(
    '/reservation',
    verifyJwtTokenController.verifyToken,
    verifyUser.verifyUser,
    verifyAvailableSeat.checkAvailableSeat,
    bookingController.add,
  );

  app.get(
    '/reservation/:userid',
    verifyJwtTokenController.verifyToken,
    bookingController.listBookingUser,
  );
  app.get(
    '/reservation/:userid/:bookingid',
    verifyJwtTokenController.verifyToken,
    verifyUser.verifyUserBooking,
    bookingController.getBookingById,
  );
  app.patch(
    '/user/:userid',
    verifyJwtTokenController.verifyToken,
    userController.update,
  );
  app.delete(
    '/user/:userid',
    verifyJwtTokenController.verifyToken,
    userController.delete,
  );
};
