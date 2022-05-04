const { Router } = require('express')

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const router = Router()


/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', function (req, res) {

})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', function (req, res) {

})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', function (req, res) {

})




module.exports = router