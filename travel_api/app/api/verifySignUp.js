const { User } = require('../models');

module.exports = {
  checkDuplicateUserNamePhoneAndEmail(req, res, next) {
    User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    }).then((userName) => {
      if (userName) {
        res.status(400).send({
          status: 'fail',
          user_name: req.body.user_name,
          message: 'User name is already taken!',
        });
        return;
      }

      User.findOne({
        where: {
          phone: req.body.phone,
        },
      }).then((phoneNbr) => {
        if (phoneNbr) {
          res.status(400).send({
            status: 'fail',
            phone: req.body.phone,
            message: 'Phone number is already taken!',
          });
          return;
        }

        User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((mail) => {
          if (mail) {
            res.status(400).send({
              status: 'fail',
              email: req.body.email,
              message: 'E-mail is already taken!',
            });
            return;
          }
          next();
        });
      });
    });
  },
};
