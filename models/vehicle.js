const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
    vehicleId: {
        type: String,
        required: true
    },
    trackerId: {
        type: String,
        required: true
    },
    isAssigned: {
        type: Boolean,
        required: true
    },
    driverId: {
        type: String,
        required: false
    },
    licensePlate: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    odometer: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    lastOnline: {
        type: Date,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    engineNumber: {
        type: String,
        required: false
    },
    chassisNumber: {
        type: String,
        required: false
    },
}, { timestamps: true })

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)