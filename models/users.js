const { ObjectId } = require('mongodb')

const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')


exports.getUserBussiness = async function getUserBussiness(id) {
    const db = getDbInstance()
    const collection = db.collection('businesses')

    const lodgings = await collection.aggregate([
        { $match: { ownerid: id } },

    ]).toArray()
    return lodgings
}

exports.getUserReview = async function getUserReview(id) {
    const db = getDbInstance()
    const collection = db.collection('reviews')

    const lodgings = await collection.aggregate([
        { $match: { userid: id } },

    ]).toArray()
    return lodgings
}

exports.getUserPhoto = async function getAllPhotos(id) {
    const db = getDbInstance()
    const collection = db.collection('photos')

    const lodgings = await collection.aggregate([
        { $match: { userid: id } },

    ]).toArray()
    return lodgings
}





