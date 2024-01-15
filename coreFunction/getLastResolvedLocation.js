import Tracker from "../models/tracker.js";
import createResolvedLocationModel from '../models/resolvedLocation.js'

export const getLastResolvedLocation = async trackerId => {
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

    // Find the last document based on the timestamp field in descending order
    const ResolvedLocation = createResolvedLocationModel(trackerId)

    try {
        const lastResolvedLocation = await ResolvedLocation.findOne({}).sort({ timestamp: -1 }).exec()

        console.table({ uuid: lastResolvedLocation.uuid });

        if (lastResolvedLocation) {
            return {
                status: 'success',
                message: null,
                data: {
                    timestamp: lastResolvedLocation.timestamp,
                    latitude: lastResolvedLocation.latitude,
                    longitude: lastResolvedLocation.longitude,
                    uuid: lastResolvedLocation.uuid,
                    locationMain: lastResolvedLocation.locationMain,
                    locationSub: lastResolvedLocation.locationSub
                    //serviceResult: lastResolvedLocation.serviceResult,
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
            message: 'Error while fetching the last resolved location.',
            data: null
        }
    }
}