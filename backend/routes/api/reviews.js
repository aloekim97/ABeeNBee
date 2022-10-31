const express = require('express')

const {check} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation.js');
const {requireAuth, restoreUser} = require('../../utils/auth.js');
const {User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize} = require("../../db/models");

const router = express.Router();

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


//get reviews //THISE ONE
router.get('/current', requireAuth, async(req, res, next) => {
    const {user} = req;

    const review = await Review.findAll({
        where: {userId: user.id},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    for(let i = 0; i < review.length; i++) {
        review[i] = review[i].toJSON();

        const pImg = await SpotImage.findOne({
            where: {
                spotId: review[i].Spot.id, 
                preview: true
            }
        })
        if(pImg) {
            review[i].Spot.previewImage = pImg.url
        } else {
            review[i].Spot.previewImage = null
        }
    }
    return res.json({Reviews: review})

})

//add image to review with reviewid
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const {reviewId} = req.params;
    const {url} = req.body;
    const {user} = req;

    const review = await Review.findByPk(reviewId)
    //userId = parseInt(user.id)
    //revUserId = parseInt(review.userId)

    if(review && parseInt(review.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    const count = await ReviewImage.count({
        where: {reviewId}
    })
    if(count >= 10) {
        const err = new Error(`Maximum number of images for this resource was reached`)
        err.status = 403;
        return next(err)
    }
    if(review) {
        const newImg = await ReviewImage.create({
            reviewId,
            url
        })
    return res.json({id: newImg.id, url: newImg.url})
    } else {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }
})

//edit a review
router.put('/:reviewId', requireAuth, async(req, res, next) => {
    const {reviewId} = req.params;
    const {user} = req;
    const {review, stars} = req.body;

    const currRev = await Review.findByPk(reviewId);
    //userId = parseInt(user.id)
    //currRevId = parseInt(currRev.userId)
    
    if(currRev && parseInt(currRev.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    if(currRev) {
        await currRev.update({
            review,
            stars
        })
        return res.json(currRev)
    } else {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }
})

//delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const {user} = req;
    const {reviewId} = req.params;

    const review = await Review.findByPk(reviewId)
    // userId = parseInt(user.id)
    // revUserId = parseInt(review.userId)

    if(review && parseInt(review.userId) !== parseInt(user.id)) {
        const err = new Error(`Forbidden`)
        err.status = 403
        return next(err)
    }
    if(!review) {
        const err = new Error(`Review couldn't be found`)
        err.status = 404;
        return next(err);
    } else {
        await review.destroy();
        return res.json({message: "Successfully deleted", statusCode: 200})
    }
})

module.exports = router