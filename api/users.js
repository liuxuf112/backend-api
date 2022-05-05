const { Router } = require('express')

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const router = Router()

const {
    getUserBussiness,
    getUserReview,
    getUserPhoto
  } = require('../models/users')


/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', async function (req, res) {
    const id = req.params.userid
    const businesses = await getUserBussiness(id)
    res.status(200).send({
      businesses: businesses
    })
})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', async function (req, res) {

    const id = req.params.userid
    const reviews = await getUserReview(id)
    res.status(200).send({
        reviews: reviews
    })
})

/*  
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', async function (req, res) {
    const id = req.params.userid
    const photos = await getUserPhoto(id)
    res.status(200).send({
        photos: photos
    })
})




module.exports = router