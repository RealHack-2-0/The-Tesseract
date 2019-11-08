const express = require('express')
const router = express.Router()
const verify = require('../auth/verify')
const User = require('../model/User')

/**
 * Users get current endpoint.
 *
 * Get user details of authenticated user.
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/current', function (req, res) {
  console.log('asd')
  User.findById(req.uid).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Error retrieving User with id: ' + req.uid
      })
    }

    // Remove password attribute from the user
    //user.password = undefined

    res.status(200).send(user)
  })
})

/**
 * Users get endpoint.
 *
 * Get all users in the system.
 *
 * @role Admin
 * @response List of user signed up in the system.
 */
router.get('/', [verify.decodeToken, verify.checkAdmin], function (_, res) {
  User.find(null).exec((err, users) => {
    if (err) {
      return res.status(500).send({
        message: 'Error retrieving Users'
      })
    }

    // Remove password attribute from the user
    users.map(user => {
      user.password = undefined
    })

    res.status(200).send(users)
  })
})

/**
 * User get user by id endpoint.
 *
 * Get the user for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/:id', [verify.decodeToken, verify.checkAdmin], function (req, res) {
  User.findById(req.params['id']).exec((err, user) => {
    if (err || user == null) {
      return res.status(500).send({
        message: 'Error retrieving User with id:' + req.params['id']
      })
    }

    // Remove password attribute from the user
    user.password = undefined

    res.status(200).send(user)
  })
})

/**
 * Users update current endpoint.
 *
 * Update the given attributes of the authenticated user.
 *
 * @body User data model exept id, password and isAdmin.
 * @role User
 */
router.put('/current', function (req, res) {
  User.findById(req.uid).then(async (user) => {
    if (req.body.firstname) {
      user.firstname = req.body.firstname
    }

    if (req.body.lastname) {
      user.lastname = req.body.lastname
    }

    if (req.body.username) {
      const existingUser = await User.findOne({
        username: req.body.username
      })
      if (existingUser) {
        return res.status(400).send({
          message: 'Username is already in taken!'
        })
      }
      user.username = req.body.username
    }

    if (req.body.email) {
      const existingUser = await User.findOne({
        email: req.body.email
      })
      if (existingUser) {
        return res.status(400).send({
          message: 'Email is already in taken!'
        })
      }
      user.email = req.body.email
    }

    return user.save().then(() => {
      res.status(200).send({
        message: 'Success, User updated!'
      })
    })
  }).catch(() => {
    res.status(500).send({
      message: 'User update error.'
    })
  })
})

/**
 * Users change privileges endpoint.
 *
 * Change to given privilage of the given user.
 *
 * @body Object with uid and isAdmin attributes
 * @role Admin
 */
router.post('/changePrivilege', [verify.decodeToken, verify.checkAdmin], function (req, res) {
  if (req.body.uid) {
    User.findById(req.body.uid).then((user) => {
      if (user) {
        user.isAdmin = !!req.body.isAdmin

        return user.save().then(() => {
          res.status(200).send({
            message: 'Success, User privilege updated!'
          })
        }).catch(() => {
          res.status(500).send({
            message: 'User privilege update error.'
          })
        })
      } else {
        return res.status(500).send({
          message: 'Error retrieving User with id: ' + req.uid
        })
      }
    }).catch(() => {
      res.status(500).send({
        message: 'User privilege update error.'
      })
    })
  } else {
    res.status(400).send({
      message: 'Missing fields'
    })
  }
})

module.exports = router