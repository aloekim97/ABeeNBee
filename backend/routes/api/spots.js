const express = require('express');

const {Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize} = require('../../db/models');
const {Op} = require('sequelize');
const {check} = require('express-validator');
const {requireAuth, restoreUser} = require('../../utils/auth.js');
const {handleValidationErrors} = require('../../utils/validation.js');

const router = express.Router();

const validatingSpot = [
    check('address')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({checkFalsy: true})
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({checkFalsy: true})
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({checkFalsy: true})
        .isLength({max: 49})
        .notEmpty()
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy: true})
        .notEmpty()
        .isNumeric()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validatingReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage(`Review text is required`),
    check(`stars`)
        .exists({checkFalsy: true})
        .isInt({gt: 0, lt: 6})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]


//get all spot
router.get('/', async(req, res, next) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    
    const err = {
        title: "Validation Error",
        message: "Validation Error",
        status: 400,
        errors: {}
    }
   
    page = parseInt(page)
    size = parseInt(size)

    if(!page) page = 1;
    if(page > 10) page = 10;
    if(page < 1) err.errors.page = `Page must be greater than or equal to 1`
    if(!size) size = 20;
    if(size > 20) size = 20;
    if(size < 1) err.errors.size = `Size must be greater than or equal to 1`

    const limit = size;
    const offset = size * (page - 1)

    minLat = parseFloat(minLat);
    maxLat = parseFloat(maxLat);
    minLng = parseFloat(minLng);
    maxLng = parseFloat(maxLng);
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    const where = {};
    
    if(minLat) {
        if (minLat > -90) where.lat = {[Op.gte]: minLat};
        else err.errors.minLat = `Minimum latitude is invalid`
    }
    if(maxLat) {
        if (maxLat < 90) where.lat = {[Op.lte]: maxLat};
        else err.errors.maxLat = `Maximum latitude is invalid`
    }
    if(minLng) {
        if (minLng < -90) where.lng = {[Op.gte]: minLng};
        else err.errors.minLng = `Minimum longitude is invalid`
    }
    if(maxLng) {
        if (maxLng < -90) where.lng = {[Op.lte]: maxLng};
        else err.errors.maxLng = `Maximum longitude is invalid`
    }
    if(minPrice) {
        if (minPrice > 0) where.price = {[Op.gte]: minPrice};
        else err.errors.minPrice = `Minimum price must be greater than or equal to 0`
    }
    if(maxPrice) {
        if (maxPrice > 0) where.price = {[Op.lte]: maxPrice};
        else err.errors.maxPrice = `Maximum price must be greater than or equal to 0`
    }

    if( err.errors.size || err.errors.page || err.errors.minLat || err.errors.maxLat || err.errors.minLng || err.errors.maxLng || err.errors.minPrice || err.errors.maxPrice ) {
        return next(err);
    }

    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage, 
                where: {preview: true},
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'AvgRating'],
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'SpotImages.url'],
        limit,
        offset,
        subQuery: false
    })
    return res.json({Spots: spots, page, size})
})

// get all spot owned by current user
router.get('/current', requireAuth, async(req, res,) => {
    const {user} = req
    const spots = await Spot.findAll({
        where: {ownerId: user.id},
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage, 
                where: {preview: true},
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 1), 'avgRating'],
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'previewImage']
    })
    return res.json({Spots: spots})
});

//get detail with spotid
router.get('/:spotId', async(req, res, next) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage, attributes: ['id', 'url', 'preview'], required: false
            },
            {
                model: Review, attributes: []
            },
            {
                model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 1), 'avgStarRating']
            ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    })
    if(!spot) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    }
    return res.json(spot)
})

//create a spot
router.post('/', validatingSpot, requireAuth, async(req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const {user} = req;

    const spot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res
        .status(201)
        .json(spot)
})

//add image to spot based on spotId 
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req;
    const {url, preview} = req.body;

    const spot = await Spot.findByPk(spotId);

    //const spotOwnerId = parseInt(spot.ownerId);
    //const userId = parseInt(user.id);

    if(spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error(`Forbidden`)
        err.status = 403;
        return next(err)
    }
    if(spot) {
        const newImg = await SpotImage.create({
            spotId,
            url,
            preview
        })
        res.json({
            id: newImg.id,
            url: newImg.url,
            preview: newImg.preview
        })
    } else {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404;
        return next(err)
    }
})

//edit a spot 
router.put('/:spotId', requireAuth, validatingSpot, async(req, res, next) => {
    const {spotId} = req.params
    const {user} = req;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const spot = await Spot.findByPk(spotId)
    // spotOwnerId = parseInt(spot.ownerId);
    // userId = parseInt(user.id);

    if(spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden')
        err.status = 403;
        return next(err)
    }
    if(spot) {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        return res.json(spot)
    } else {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404;
        return next(err)
    }
});

//delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req;

    const spot = await Spot.findByPk(spotId);

    // spotOwnerId = parseInt(spot.ownerId);
    // userId = parseInt(user.id);
    if(spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }
    if(spot) {
        await spot.destroy();
        return res.json({"message": "Successfully deleted", "statusCode": 200})
    } else {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404;
        return next(err)
    }
})

// FROM REVIEW


//get all review by spot id
router.get('/:spotId/reviews', async(req, res, next) => {
    const {spotId} = req.params;

    const spot = await Spot.findByPk(spotId) 
    
    if(spot) {
        const review = await Review.findAll({
            where: {spotId: spot.id},
            include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    },
                    {
                        model: ReviewImage,
                        attributes: ['id', 'url']
                    }
            ]
        })
        return res.json({Reviews: review})
    } else {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    }
})

//create review for a spot based on spot id //getReview?
router.post('/:spotId/reviews', requireAuth, validatingReview, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req;
    const {review, stars} = req.body;

    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    }
    const currRev = await spot.getReviews({
        where: {userId: user.id}
    })

    if(currRev.length > 0) {
        const err = new Error(`User already has a review for this spot`)
        err.status = 403;
        return next(err)
    }
    const newRev = await Review.create({
        userId: user.id,
        spotId,
        review,
        stars
    })
    return res.json(newRev)
})

//BOOKINGS
//get booking for spot by spotId
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req

    const spot = await Spot.findByPk(spotId)
    //userId = parseInt(user.id)
    //spotOwner = parseInt(spot.ownerId)
    if(!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404;
        return next(err)
    }

    if(spot && parseInt(spot.ownerId) === parseInt(user.id)) {
        const book = await Booking.findAll({
            where: {spotId},
            include: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
        })
        return res.json({Booking: book})
    } else if (spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const book = await Booking.findAll({
            where: {spotId},
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({Booking: book})
    } 
})

//create booking from spotId //FIX UP
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req;
    const {startDate, endDate} = req.body;

    const spot = await Spot.findByPk(spotId);
    // userId = parseInt(user.id)
    // spotOwnerId = parseInt(spot.ownerId)

    if(!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404;
        return next(err)
    }
    

    if(spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const startDay = new Date(startDate)
        const endDay = new Date(endDate)
    
        if(startDay > endDay) {
            const err = new Error(`Validation error`)
            err.status = 400;
            err.errors = {endDate: "endDate cannot be on or before startDate"};
            return next(err)
        }
        const booked = await Booking.findOne({
            where: {
                [Op.or]: [
                    {startDate: startDay},
                    {endDate: endDay}
                ]
            }
        })
        if(booked) {
            const newBook = await Booking.create({
                spotId,
                userId: user.id,
                startDate,
                endDate
            })
            return res.json(newBook)
        } else {
            const err = new Error(`Sorry, this spot is already booked for the specified dates`)
                err.status = 403;
                err.errors = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
                return next(err)
        }
    }
})



module.exports = router