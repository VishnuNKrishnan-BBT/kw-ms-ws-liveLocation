import mongoose from "mongoose"
const Schema = mongoose.Schema

const waypointSchema = new Schema({
    trackerId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: false
    },
    speed: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: false
    }
}, { timestamps: true })

const createWaypointModel = trackerId => { //This is required as the table name is dynamic.
    return mongoose.model(`WP_${trackerId}`, waypointSchema)
}

export default createWaypointModel