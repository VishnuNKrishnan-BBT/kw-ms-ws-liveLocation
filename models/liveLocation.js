import mongoose from 'mongoose'
const Schema = mongoose.Schema

const liveLocation = new Schema({
    trackerId: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    altitude: {
        type: String,
        required: true
    },
    accuracy: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Vehicle = mongoose.model('LiveLocation', liveLocation)

export default Vehicle