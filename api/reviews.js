const { Router } = require('express')

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');



/*
 * Schema describing required/optional fields of a review object.
 */


const {
  reviewSchema,
  insertNewReview,
  getReviewById,
  deleteReview,
  updateReviewById

} = require('../models/reviews')

const router = Router()
/*
 * Route to create a new review.
 */
router.post('/', async function (req, res, next) {

  if (validateAgainstSchema(req.body, reviewSchema)) {
      const id = await insertNewReview(req.body)
      res.status(201).send({ id: id })
  } else {
      res.status(400).send({
          err: "Request body is not a valid review"
      })
  }

})

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', async function (req, res, next) {
  const id = req.params.reviewID
  const review = await getReviewById(id)
  if (review) {
      res.status(200).send(review)
  } else {
      next()
  }
})

/*
 * Route to update a review.
 */
router.put('/:reviewID', async function (req, res, next) {
  if (validateAgainstSchema(req.body, reviewSchema)) {
    const update = await updateReviewById(req.params.reviewID, req.body)
    if(update){
      res.status(204).send()
    }
    else{
      next()
    }
  }
  else{
    res.status(400).send({
      err: "Request body is not a valid review"
    })
  }  
})

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', async function (req, res, next) {
  const id = req.params.reviewID
  const deleteSuccessful = await deleteReview(id)
  if(deleteSuccessful){
    res.status(204).end()
  }
  else{
    next()
  }
})



module.exports = router