const express = require('express')
const router = express.Router()
const verify = require('../auth/verify')
const Service = require('../model/Service')

/**
 * Services get endpoint.
 *
 * Get all the services in the system.
 *
 * @role User
 * @response List of services
 */
router.get('/', [verify.decodeToken], function (_, res) {
  Service.find().exec((err, services) => {
    if (err || services == null) {
      return res.status(500).send({
        message: 'Error retrieving services'
      })
    }

    res.status(200).send(services)
  })
})

/**
 * Services get by id endpoint.
 *
 * Get the service for the given service id.
 *
 * @params id
 * @role User
 * @response Service of the given id.
 */
router.get('/:id', [verify.decodeToken], function (req, res) {
  Service.findById(req.params['id']).exec((err, service) => {
    if (err || service == null) {
      return res.status(500).send({
        message: 'Error retrieving Service with id: ' + req.params['id']
      })
    }

    res.status(200).send(service)
  })
})

/**
 * Services create endpoint.
 *
 * Create the given service.
 *
 * @body Service data model exept id
 * @role Admin
 */
router.post('/', [verify.decodeToken, verify.checkAdmin], function (req, res) {
  if (!!req.body.name && !!req.body.description) {
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    })
    service.save().then(() => {
      res.status(200).send({
        message: 'Success, Service created!'
      })
    }).catch(() => {
      res.status(500).send({
        message: 'Service creation error.'
      })
    })
  } else {
    res.status(400).send({
      message: 'Missing fields'
    })
  }
})

/**
 * Services update endpoint.
 *
 * Update the given service details of the given service id.
 *
 * @params id
 * @Body Service data model
 * @role Admin
 */
router.put('/:id', [verify.decodeToken, verify.checkAdmin], function (req, res) {
  Service.findById(req.params['id']).exec((err, service) => {
    if (err || service == null) {
      return res.status(500).send({
        message: 'Error updating Service with id: ' + req.params['id']
      })
    }

    if (req.body.name) {
      service.name = req.body.name
    }

    if (req.body.description) {
      service.description = req.body.description
    }

    if (req.body.price) {
      service.price = req.body.price
    }

    service.save().then(() => {
      res.status(200).send({
        message: 'Success, Service updated!'
      })
    }).catch(() => {
      res.status(500).send({
        message: 'Service update error.'
      })
    })
  })
})

/**
 * Services delete endpoint.
 *
 * Delete the service referenced to the given service id.
 *
 * @param id
 * @role Admin
 */
router.delete('/:id', [verify.decodeToken, verify.checkAdmin], function (req, res) {
  Service.findById(req.params['id']).exec((err, service) => {
    if (err || service == null) {
      return res.status(500).send({
        message: 'Error deleting Service with id: ' + req.params['id']
      })
    }

    service.delete().then(() => {
      res.status(200).send({
        message: 'Success, Service deleted!'
      })
    }).catch(() => {
      res.status(500).send({
        message: 'Service delete error.'
      })
    })
  })
})

module.exports = router