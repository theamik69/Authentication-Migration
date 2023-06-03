require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { User } = require('../models');
const config = require('../config/configRoles');

module.exports = {
  signup(req, res) {
    const userId = `user-${nanoid(12)}`;
    return User
      .create({
        id: userId,
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }).then((user) => {
        res.status(201).send({
          status: 'success',
          id: user.id,
          message: 'User registered successfully!',
        });
      }).catch((err) => {
        res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        });
      });
  },

  signin(req, res) {
    return User
      .findOne({
        where: {
          user_name: req.body.user_name,
        },
      }).then((user) => {
        if (!user) {
          return res.status(404).send({
            auth: false,
            user_name: req.body.user_name,
            accessToken: null,
            message: 'Error',
            errors: 'User Not Found.',
          });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            user_name: req.body.user_name,
            accessToken: null,
            message: 'Error',
            errors: 'Invalid Password!',
          });
        }

        const token = `Bearer ${jwt.sign({
          id: user.id,
        }, config.secret, {
          expiresIn: 86400, // 24h expired
        })}`;

        res.status(201).send({
          status: 'success',
          id: user.id,
          username: req.body.user_name,
          accessToken: token,
        });
      }).catch((err) => {
        res.status(500).send({
          status: false,
          user_name: req.body.user_name,
          accessToken: null,
          message: 'Error',
          errors: err,
        });
      });
  },

  update(req, res) {
    return User
      .findByPk(req.params.userid, {})
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status_response: 'Bad Request',
            errors: 'User Not Found',
          });
        }

        return user
          .update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          })
          .then(() => {
            const status = {
              status: 'success',
              message: 'The user data has been updated',
            };
            return res.status(200).send(status);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  delete(req, res) {
    return User
      .findByPk(req.params.userid)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            status_response: 'Bad Request',
            errors: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            status: 'success',
            message: 'User account has been deleted',
          }))
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },
};
