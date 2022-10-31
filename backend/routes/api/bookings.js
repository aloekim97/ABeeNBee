const express = require('express');

const {check} = require('express-validator')
const {handleValidationErrors } = require('../../utils/validation.js');
const {requireAuth, restoreUser} = require('../../utils/auth.js');
const {User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize} = require("../../db/models");
const router = express.Router();

//get all current user's bookings
router.get('/current', requireAuth, async(req, res, next) => {
    const {user} = req;

    const book = await Booking.findAll({
        where: {userId: user.id},
        include:[
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            }
        ]
    })
    for(let i = 0; i < book.length; i++) {
        book[i] = book[i].toJSON();

        let pImg = await SpotImage.findOne({
            where: {
                spotId: book[i].Spot.id,
                preview: true
            }
        })
        if(pImg) {
            book[i].Spot.previewImage = pImg.url;
        } else {
            book[i].Spot.previewImage = null
        }
    }
    return res.json({Bookings: book})
})


//edit a booking with bookingId
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    const {bookingId} = req.params;
    const {user} = req;
    const {startDate, endDate} = req.body

    const booking = await Booking.findByPk(bookingId)
    // userId = parseInt(user.id)
    // currBookId = parseInt(booking.userId)
    if(!booking) {
        const err = new Error(`Booking couldn't be found`)
        err.status = 404;
        return next(err)
    }

    if(booking && parseInt(booking.userId) === parseInt(user.id)) {
        const startDay = new Date(startDate)
        const endDay = new Date(endDate)
    
        if(startDay > endDay) {
            const err = new Error(`Validation error`)
            err.status = 400;
            err.errors = {endDate: "endDate cannot be on or before startDate"};
            return next(err)
        }
        if(new Date() > endDay) {
            const err = new Error(`Past bookings can't be modified`)
            err.status = 403;
            return next(err)
        }
        const booked = await Booking.findOne({
            where : {
                [Op.or]: {startDay, endDay}
            }
        })
        if(booked) {
            const err = new Error(`Sorry, this spot is already booked for the specified dates`)
            err.status = 403;
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            return next(err)
        }
        const newBook = await booking.update({
                startDate,
                endDate
        })
        return res.json(newBook)
    } else {
        const err = Error(`Forbidden: You can't book your own spot.`);
        err.status = 403
        return next(err);
    }
})

router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const {bookingId} = req.params
    const {user} = req;

    const booking = await Booking.findByPk(bookingId)
    // userId = parseInt(user.id)
    // bookingUserId = parseInt(booking.userId)

    if(booking && parseInt(booking.userId) ===parseInt(user.id)) {
        await booking.delete();
        res.json({message: "Successfully deleted", statusCode: 200})
    } 
    if(!booking) {
        const err = new Error(`Booking couldn't be found`)
        err.status = 404;
        return next(error)
    }
    if(booking.startDate < new Date()) {
        const err = new Error(`Bookings that have been started can't be deleted`)
        err.status = 403;
        return next(error)
    }
})
module.exports = router;