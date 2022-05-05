const { Router } = require('express')
const { validateAgainstSchema } = require('../lib/validation')

const {
  businessSchema,
  insertNewBusiness,
  getAllBusinesses,
  getBusinessById,
  deleteBusiness,
  updateBusinessById

} = require('../models/businesses')

const router = Router()

/*
 * Route to return a list of businesses.
 */
router.get('/', async function (req, res, next) {
  const businesses = await getAllBusinesses()
  res.status(200).send({
    businesses: businesses
  })
})

/*
 * Route to create a new business.
 */
router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, businessSchema)) {
      const id = await insertNewBusiness(req.body)
      res.status(201).send({ id: id })
  } else {
      res.status(400).send({
          err: "Request body is not a valid business"
      })
  }
})

/*
 * Route to fetch info about a specific business.
 */
router.get('/:id', async function (req, res, next) {
  const id = req.params.id
  const business = await getBusinessById(id)
  if (business) {
      res.status(200).send(business)
  } else {
      next()
  }
})

/*
 * Route to replace data for a business.
 */
router.patch('/:id', async function (req, res, next) {
  
  if (validateAgainstSchema(req.body, businessSchema)) {
    const update = await updateBusinessById(req.params.id, req.body)
    if(update){
      res.status(204).send()
    }
    else{
      next()
    }
  }
  else{
    res.status(400).send({
      err: "Request body is not a valid business"
    })
  }

})

/*
 * Route to delete a business.
 */
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  const deleteSuccessful = await deleteBusiness(id)
  if(deleteSuccessful){
    res.status(204).end()
  }
  else{
    next()
  }
})





module.exports = router