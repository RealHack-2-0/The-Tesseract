const express = require('express')
const router = express.Router()
const verify = require('../auth/verify')
const Reservation = require('../model/Reservation')
const {
  ReservationStatus
} = require('../common/constants')
const {
  from
} = require('rxjs')
const {
  map,
  throwIfEmpty,
  flatMap
} = require('rxjs/operators')
const {
  hukx,
  piperOf
} = require('hukx')
const piper = piperOf(router)

/**
 * Reservations get all endpoint.
 *
 * Get the all the reservation in the system.
 *
 * @role Admin
 * @response List of reservations
 */
piper.get('/all', [verify.decodeToken, verify.checkAdmin], hukx.pipe(
  flatMap(() => from(Reservation.find().populate("vehicle createdBy")))
))

/**
 * Reservations get all by id endpoint.
 *
 * Get the reservation referenced by the given reservation id form the all the reservation in the system.
 *
 * @param id
 * @role Admin
 * @response Reservation of the given id
 */
piper.get('/all/:id', [verify.decodeToken, verify.checkAdmin], hukx.pipe(
  flatMap(req => from(Reservation.findById(req.params['id'])))
))

/**
 * Reservations get endpoint.
 *
 * Get all the reservations created by the authenticated user.
 *
 * @role User
 * @response List of reservations
 */
piper.get('/', [verify.decodeToken], hukx.pipe(
  flatMap(req => from(Reservation.find({
    createdBy: req.uid
  }).populate("vehicle"))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Error retrieving reservations'
  }))
))

/**
 * Reservations get by id endpoint.
 *
 * Get the reservation for the given reservation id if created by authenticated user.
 *
 * @params id
 * @role User
 * @response Reservation of the given id.
 */
piper.get('/:id', [verify.decodeToken], hukx.pipe(
  flatMap(req => from(Reservation.findOne({
    _id: req.params['id'],
    createdBy: req.uid
  }))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Error retrieving the Reservation.'
  }))
))

/**
 * Reservations create endpoint.
 *
 * Create the given reservated for the authenticated user.
 *
 * @body Reservation data model exept id, status and created
 * @role User
 */
piper.post('/', [verify.decodeToken], hukx.pipe(
  map(req => {
    if (!req.body.vehicle || !req.body.services || !req.body.requested)
      throw hukx.error(500, {
        message: 'Missing fields'
      })

    return req
  }),
  map(req => new Reservation({
    vehicle: req.body.vehicle,
    services: req.body.services,
    requested: req.body.requested,
    status: ReservationStatus.CREATED,
    created: Date.now(),
    createdBy: req.uid
  })),
  flatMap(reservation => from(reservation.save())),
  map(() => {
    return {
      message: 'Success, Reservation created!'
    }
  })
))

/**
 * Reservations accept endpoint.
 *
 * Accept the reservation of the given id.
 *
 * @params id
 * @role Admin
 */
piper.post('/accept/:id', [verify.decodeToken, verify.checkAdmin], hukx.pipe(
  flatMap(req => from(Reservation.findById(req.params['id']))),
  map(reservation => {
    reservation.status = ReservationStatus.ACCEPTED
    reservation.alloctated = reservation.requested

    return reservation
  }),
  flatMap(reservation => from(reservation.save())),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Reservation accept error.'
  })),
  map(() => {
    return {
      message: 'Success, Reservation accepted!'
    }
  }),
))

/**
 * Reservations propose endpoint.
 *
 * Propose an allocated date time for the reservation of the given reservation id.
 *
 * @params id
 * @body Object with allocated date time
 * @role Admin
 */
piper.post('/propose/:id', [verify.decodeToken, verify.checkAdmin], hukx.pipe(
  map(req => {
    if (!req.body.allocated)
      throw hukx.error(500, {
        message: 'Missing fields'
      })

    return req
  }),
  flatMap(req => from(Reservation.updateOne({
    _id: req.params['id']
  }, {
    status: ReservationStatus.PROPOSED,
    alloctated: req.body.alloctated
  }))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Reservation propose error.'
  })),
  map(() => {
    return {
      message: 'Success, New reservation date time proposed!'
    }
  }),
))

/**
 * Reservations accept proposal endpoint.
 *
 * Accept the proposed allocated date time for the reservation of the given reservation id.
 *
 * @params id
 * @role User
 */
piper.post('/acceptProposal/:id', [verify.decodeToken], hukx.pipe(
  flatMap(req => from(Reservation.updateOne({
    _id: req.params['id']
  }, {
    status: ReservationStatus.ACCEPTED
  }))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Reservation propose error.'
  })),
  map(() => {
    return {
      message: 'Success, Reservation accepted!'
    }
  }),
))

/**
 * Reservations update endpoint.
 *
 * Update the services of the reservation by the given id created by authenticated user.
 *
 * @params id
 * @Body Updated services
 * @role User
 */
piper.put('/:id', [verify.decodeToken], hukx.pipe(
  map(req => {
    const query = {
      _id: req.params['id'],
      createdBy: req.uid
    }
    const update = {}

    var isChanging = false

    if (req.body.services) {
      isChanging = true
      update.services = req.body.services
    }

    if (isChanging)
      update.status = ReservationStatus.CHANGED

    return {
      query: query,
      update: update
    }
  }),
  flatMap(res => from(Reservation.updateOne(res.query, res.update))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Reservation update error.'
  })),
  map(() => {
    return {
      message: 'Success, Reservation updated!'
    }
  }),
))

/**
 * Reservations delete endpoint.
 *
 * Delete the reservation referenced to the given reservation id if created by authenticated user.
 *
 * @param id
 * @role User
 */
piper.delete('/:id', [verify.decodeToken], hukx.pipe(
  flatMap(req => from(Reservation.deleteOne({
    _id: req.params['id'],
    createdBy: req.uid
  }))),
  throwIfEmpty(() => hukx.error(500, {
    message: 'Error deleting Reservation with id.'
  })),
  map(() => {
    return {
      message: 'Success, Reservation deleted!'
    }
  })
))

module.exports = router