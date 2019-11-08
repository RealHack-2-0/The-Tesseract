const express = require('express')
const router = express.Router()
const verify = require('../auth/verify')
const Car = require('../model/Car')
const mongoose = require('mongoose')

/**
 * Cars get endpoint.
 *
 * Get all the cars owned by authenticated user.
 *
 * @role User
 * @response List of cars owned by user
 */
router.get('/', [verify.decodeToken], function (req, res) {
  Car.find({ ownerId: new mongoose.Types.ObjectId(req.uid) }).exec((err, cars) => {
    if (err || cars == null) {
      return res.status(500).send({
        message: 'Error retrieving User with id: ' + req.uid
      })
    }

    res.status(200).send(cars)
  })
})

/**
 * Cars get by id endpoint.
 *
 * Get the car for the given car id if the car is owned by the authenticated user.
 *
 * @params id
 * @role User
 * @response Car of the given id.
 */
router.get('/:id', [verify.decodeToken], function (req, res) {
  Car.findById(req.params['id']).exec((err, car) => {
    if (err || car == null) {
      return res.status(500).send({
        message: 'Error retrieving Car with id: ' + req.params['id']
      })
    }

    if (car.ownerId.toString() !== req.uid.toString()) {
      return res.status(400).send({
        message: 'Unauthorized for the resource'
      })
    }

    res.status(200).send(car)
  })
})

/**
 * Cars create endpoint.
 *
 * Create the given car for the authenticated user.
 *
 * @body Car data model exept id
 * @role User
 */
router.post('/', [verify.decodeToken], function (req, res) {
  if (!!req.body.model && !!req.body.vendor && !!req.body.number) {
    const car = new Car({
      model: req.body.model,
      vendor: req.body.vendor,
      number: req.body.number,
      milage: req.body.milage,
      ownerId: new mongoose.Types.ObjectId(req.uid)
    })
    car.save().then(() => {
      res.status(200).send({ message: 'Success, Car created!' })
    }).catch(() => {
      res.status(500).send({ message: 'Car creation error.' })
    })
  } else {
    res.status(400).send({ message: 'Missing fields' })
  }
})

/**
 * Cars update endpoint.
 *
 * Update the given car details of the given car id owned by the authenticated user.
 *
 * @params id
 * @Body Car data model
 * @role User
 */
router.put('/:id', [verify.decodeToken], function (req, res) {
  Car.findById(req.params['id']).exec((err, car) => {
    if (err || car == null) {
      return res.status(500).send({
        message: 'Error updating Car with id: ' + req.params['id']
      })
    }

    if (car.ownerId.toString() !== req.uid.toString()) {
      return res.status(400).send({
        message: 'Unauthorized for the resource'
      })
    }

    if (req.body.model) {
      car.model = req.body.model
    }

    if (req.body.vendor) {
      car.vendor = req.body.vendor
    }

    if (req.body.number) {
      car.number = req.body.number
    }

    if (req.body.milage) {
      car.milage = req.body.milage
    }
    car.save().then(() => {
      res.status(200).send({ message: 'Success, Car updated!' })
    }).catch(() => {
      res.status(500).send({ message: 'Car update error.' })
    })
  })
})

/**
 * Cars delete endpoint.
 *
 * Delete the car referenced to the given car id which is owned by authenticated user.
 *
 * @param id
 * @role User
 */
router.delete('/:id', [verify.decodeToken], function (req, res) {
  Car.findById(req.params['id']).exec((err, car) => {
    if (err || car == null) {
      return res.status(500).send({
        message: 'Error deleting Car with id: ' + req.params['id']
      })
    }

    if (car.ownerId.toString() !== req.uid.toString()) {
      return res.status(400).send({
        message: 'Unauthorized for the resource'
      })
    }

    car.delete().then(() => {
      res.status(200).send({ message: 'Success, Car deleted!' })
    }).catch(() => {
      res.status(500).send({ message: 'Car delete error.' })
    })
  })
})

module.exports = router
