const { ObjectId } = require('mongodb')

const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

/*
 * Schema for a businessSchema.
 */

/*
    
*/
const businessSchema = {
    ownerid: { required: true },
    name: { required: true },
    address: { required: true },
    city: { required: true },
    state: { required: true },
    zip: { required: true },
    phone: { required: true },
    category: { required: true },
    subcategory: { required: true },
    website: { required: false },
    email: { required: false }
  }
exports.businessSchema = businessSchema


//business, Business, Businesses, businesses
exports.insertNewBusiness = async function insertNewBusiness(business) {
    const db = getDbInstance()
    const collection = db.collection('businesses')

    business = extractValidFields(business, businessSchema)
    const result = await collection.insertOne(business)
    return result.insertedId
}

exports.getAllBusinesses = async function getAllBusinesses() {
    const db = getDbInstance()
    const collection = db.collection('businesses')
    const businesses = await collection.find({}).toArray()
    return businesses
}

exports.getBusinessById = async function getBusinessById(id) {
    const db = getDbInstance()
    const collection = db.collection('businesses')
    // const lodgings = await collection.find({
    //     _id: new ObjectId(id)
    // }).toArray()
    const businesses = await collection.aggregate([
        { $match: { _id: new ObjectId(id) } }
    ]).toArray()
    return businesses[0]
}


exports.deleteBusiness = async function deleteBusiness(id) {
    const db = getDbInstance()
    const collection = db.collection('businesses')
    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return result.deletedCount > 0
}


exports.updateBusinessById = async function updateBusinessById(id, business){
    const businessValues = {
        ownerid: business.ownerid,
        name: business.name,
        address: business.address,
        city: business.city,
        state: business.state,
        zip: business.zip,
        phone: business.phone,
        category: business.category,
        subcategory: business.subcategory,
        website: business.website,
        email: business.email
    }
    const db = getDbInstance()
    const collection = db.collection('businesses')
    
    const result = await collection.replaceOne(
        { _id: new ObjectId(id) },
        businessValues
    )
    
    return result.matchedCount > 0
}