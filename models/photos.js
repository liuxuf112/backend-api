const { ObjectId } = require('mongodb')

const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

/*
 * Schema for a photo.
 */


const photoSchema = {
    userid: { required: true },
    businessid: { required: true },
    caption: { required: false }
  }
exports.photoSchema = photoSchema


//business, Business, Businesses, businesses
//photo, Photo, photos, Photos
exports.insertNewPhoto = async function insertNewPhoto(photo) {
    const db = getDbInstance()
    const collection = db.collection('photos')

    photo = extractValidFields(photo, photoSchema)
    const result = await collection.insertOne(photo)
    return result.insertedId
}

// exports.getAllPhotos = async function getAllPhotos() {
//     const db = getDbInstance()
//     const collection = db.collection('photos')
//     const photos = await collection.find({}).toArray()
//     return photos
// }

exports.getPhotoById = async function getPhotoById(id) {
    const db = getDbInstance()
    const collection = db.collection('photos')
    // const lodgings = await collection.find({
    //     _id: new ObjectId(id)
    // }).toArray()
    const photos = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } }
    ]).toArray()
    return photos[0]
}


exports.deletePhoto = async function deletePhoto(id) {
    const db = getDbInstance()
    const collection = db.collection('photos')
    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return result.deletedCount > 0
}


exports.updatePhotoById = async function updatePhotoById(id, photo){
    const photoValues = {
        userid: photo.userid,
        businessid: photo.businessid,
        caption: photo.caption
    }
    const db = getDbInstance()
    const collection = db.collection('photos')
    
    const result = await collection.replaceOne(
        { _id: new ObjectId(id) },
        photoValues
    )
    
    return result.matchedCount > 0
}


