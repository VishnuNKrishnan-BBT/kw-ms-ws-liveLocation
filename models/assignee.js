const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assigneeSchema = new Schema({
    assigneeId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    primaryContactCC: { //Country code (971, 91, 972 etc...) without '+'
        type: Number,
        required: true
    },
    primaryContactNumber: { //Contact number without country code
        type: Number,
        required: true
    },
    primaryContactNumberVerified: {
        type: Boolean,
        required: true
    },
    primaryContactEmail: { //Country code (971, 91, 972 etc...)
        type: String,
        required: true
    },
    primaryContactEmailVerified: {
        type: Boolean,
        required: true
    },
    secondaryContactCC: { //Country code (971, 91, 972 etc...) without '+'
        type: Number,
        required: false
    },
    secondaryContactNumber: { //Contact number without country code
        type: Number,
        required: false
    },
    secondaryContactEmail: { //Country code (971, 91, 972 etc...)
        type: String,
        required: false
    },
    photoB64: { //Base64 string
        type: String,
        required: false
    }
}, { timestamps: true })

export const Assignee = mongoose.model('Assignee', assigneeSchema)