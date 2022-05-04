const { Router } = require('express')

const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const router = Router()



/*
 * Schema describing required/optional fields of a photo object.
 */
const photoSchema = {
  userid: { required: true },
  businessid: { required: true },
  caption: { required: false }
};


/*
 * Route to create a new photo.
 */
router.post('/', function (req, res, next) {

})

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', function (req, res, next) {

})

/*
 * Route to update a photo.
 */
router.put('/:photoID', function (req, res, next) {

})

/*
 * Route to delete a photo.
 */
router.delete('/:photoID', function (req, res, next) {

})



module.exports = router