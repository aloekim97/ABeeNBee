const express = require('express')

const {check} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation.js');
const {requireAuth, restoreUser} = require('../../utils/auth.js');
const {User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize} = require("../../db/models");

const router = express.Router()

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const {imageId} = req.params
    const {user} = req

    const img = await SpotImage.findByPk(imageId, {
        include: [
            {model: Spot, attributes: ['ownerId']}
        ]
    })
    userId = parseInt(user.id)
    spotOwnerId = parseInt(img.Spot.spotOwnerId)

    if(img && spotOwnerId !== userId) {
        const err = new Error(`Forbidden`)
        err.status = 403
        return next(err)
    }
    if(img) {
        await img.destroy();
        return res.json({message: "Successfully deleted", statusCode: 200})
    } else {
        const err = new Error(`Spot Image couldn't be found`)
        err.status = 404
        return next(err)
    }
})



module.exports = router