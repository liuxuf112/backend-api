const { Router } = require('express')

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const router = Router()

/*
 * Schema describing required/optional fields of a review object.
 */
const reviewSchema = {
  userid: { required: true },
  businessid: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false }
};


/*
 * Route to create a new review.
 */
router.post('/', function (req, res, next) {

})

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', function (req, res, next) {

})

/*
 * Route to update a review.
 */
router.put('/:reviewID', function (req, res, next) {

})

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', function (req, res, next) {

})



module.exports = router