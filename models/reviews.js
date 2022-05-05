const { ObjectId } = require('mongodb')

const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

/*
 * Schema for a photo.
 */


const reviewSchema = {
    userid: { required: true },
    businessid: { required: true },
    dollars: { required: true },
    stars: { required: true },
    review: { required: false }
  }
exports.reviewSchema = reviewSchema



//photo, Photo, photos, Photos
//review, Review, reviews, Reviews
exports.insertNewReview = async function insertNewReview(review) {
    const db = getDbInstance()
    const collection = db.collection('reviews')

    review = extractValidFields(review, reviewSchema)
    const result = await collection.insertOne(review)
    return result.insertedId
}

// exports.getAllPhotos = async function getAllPhotos() {
//     const db = getDbInstance()
//     const collection = db.collection('photos')
//     const photos = await collection.find({}).toArray()
//     return photos
// }

exports.getReviewById = async function getReviewById(id) {
    const db = getDbInstance()
    const collection = db.collection('reviews')
    // const lodgings = await collection.find({
    //     _id: new ObjectId(id)
    // }).toArray()
    const reviews = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } }
    ]).toArray()
    return reviews[0]
}


exports.deleteReview = async function deleteReview(id) {
    const db = getDbInstance()
    const collection = db.collection('reviews')
    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return result.deletedCount > 0
}


exports.updateReviewById = async function updateReviewById(id, review){
    const reviewValues = {
        userid: review.userid,
        businessid: review.businessid,
        dollars: review.dollars,
        stars: review.stars,
        review: review.review
    }
    const db = getDbInstance()
    const collection = db.collection('reviews')
    
    const result = await collection.replaceOne(
        { _id: new ObjectId(id) },
        reviewValues
    )
    
    return result.matchedCount > 0
}



