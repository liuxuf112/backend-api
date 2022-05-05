const { Router } = require('express')
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

/*
 * Schema describing required/optional fields of a photo object.
 */

const {
  photoSchema,
  insertNewPhoto,
  //getAllPhotos,
  getPhotoById,
  deletePhoto,
  updatePhotoById

} = require('../models/photos')


const router = Router()

/*
 * Route to create a new photo.
 */
router.post('/', async function (req, res, next) {
  if (validateAgainstSchema(req.body, photoSchema)) {
      const id = await insertNewPhoto(req.body)
      res.status(201).send({ id: id })
  } else {
      res.status(400).send({
          err: "Request body is not a valid photo"
      })
  }
})

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', async function (req, res, next) {
  const id = req.params.photoID
  const photo = await getPhotoById(id)
  if (photo) {
      res.status(200).send(photo)
  } else {
      next()
  }
})

/*
 * Route to update a photo.
 */
router.put('/:photoID', async function (req, res, next) {

  if (validateAgainstSchema(req.body, photoSchema)) {
    const update = await updatePhotoById(req.params.photoID, req.body)
    if(update){
      res.status(204).send()
    }
    else{
      next()
    }
  }
  else{
    res.status(400).send({
      err: "Request body is not a valid photo"
    })
  }  

})

/*
 * Route to delete a photo.
 */
router.delete('/:photoID', async function (req, res, next) {

  const id = req.params.photoID
  const deleteSuccessful = await deletePhoto(id)
  if(deleteSuccessful){
    res.status(204).end()
  }
  else{
    next()
  }


})



module.exports = router