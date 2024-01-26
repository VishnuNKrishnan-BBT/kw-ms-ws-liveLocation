import Tracker from '../models/tracker.js'
import LiveLocation from '../models/liveLocation.js'

export const getLastWaypoint = async trackerId => {
    //Check if trackerId exists
    const trackerSearchResult = await Tracker.find({ trackerId: trackerId })

    if (trackerSearchResult.length == 0) {
        const errMessage = `Tracker ID ${trackerId} does not exist!`
        console.log(errMessage)
        return {
            status: 'fail',
            message: errMessage
        }
    }

    try {
        const lastWaypoint = await LiveLocation.findOne({ trackerId: trackerId })

        console.table({ timestamp: lastWaypoint.timestamp });

        if (lastWaypoint) {
            return {
                status: 'success',
                message: null,
                data: {
                    timestamp: lastWaypoint.timestamp,
                    latitude: lastWaypoint.latitude,
                    longitude: lastWaypoint.longitude,
                    heading: lastWaypoint.heading,
                    speed: lastWaypoint.speed,
                    altitude: lastWaypoint.altitude,
                    accuracy: lastWaypoint.accuracy,
                }
            }
        } else {
            return {
                status: 'fail',
                message: 'No documents found in the collection.',
                data: null
            }
        }
    } catch (err) {
        console.error(err)
        return {
            status: 'fail',
            message: 'Error while fetching the last waypoint.',
            data: null
        }
    }
}