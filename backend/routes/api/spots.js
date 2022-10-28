const express = require('express');

const {Booking, Review, ReviewImage, Spot, SpotImage, User, Sequelize} = require('../../db/models');
const {Op} = require('sequelize');
const {check} = require('express-validator');
const {requireAuth, restoreUser} = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');
const spotimage = require('../../db/models/spotimage');

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


//get all spot
router.get('/', async(_req, res, _next) => {
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
        group: ['Spot.id', 'SpotImages.url']
    })
    return res.json(spots)
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
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
                [Sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'previewImage']
    })
    return res.json(spots)
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
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
            ]
        },
        group: ['Spot.id', 'SpotImage.id', 'Owner.id']
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

    spotOwnerId = parseInt(spot.ownerId);
    userId = parseInt(user.id);

    if(spot && spotOwnerId !== userId) {
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
        return res.json({
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
    spotOwnerId = parseInt(spot.ownerId);
    userId = parseInt(user.id);

    if(spot && spotOwnerId !== userId) {
        const err = new Error('Forbidden')
        err.status = 403;
        return next(err)
    }
    if(spot) {
        await spot.create({
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

    spotOwnerId = parseInt(spot.ownerId);
    userId = parseInt(user.id);
    if(spot && spotOwnerId !== user) {
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
                        model: user,
                        attributes: ['id', 'firstName', 'lastName']
                    },
                    {
                        model: ReviewImage,
                        attributes: ['id', 'url']
                    }
            ]
        })
        return res.json(review)
    } else {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    }
})

//create review for a spot based on spot id
router.post('/:spotId/review', requireAuth, validatingReview, async(req, res, next) => {
    const {spotId} = req.params;
    const {user} = req;
    const {review, stars} = req.body;

    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    }
    const currRev = await spot.findAll({
        attributes: ['Reviews'],
        where: {userId: user.id}
    })
    if(currRev.length > 1) {
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

module.exports = router