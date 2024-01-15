import { WebSocketServer } from "ws"
import { connectToDB } from './connectToDB.js'
import { getLastWaypoint } from "./coreFunction/getLastWaypoint.js"
import { getLastResolvedLocation } from "./coreFunction/getLastResolvedLocation.js"

const wss = new WebSocketServer({ port: process.env.PORT || 4003 })

connectToDB()

wss.on("connection", function connection(ws) {

    //Dummy data to bypass authentication
    const auth = {
        trackerId: 'ABC-123-DEF-456',
        authToken: 'tegw6637288jjchd'
    }

    let interval

    ws.on("message", function message(data) {

        //Authentication - Every message is authenticated due to sensitivity of data returned.
        const authData = JSON.parse(data)

        //=================VALIDATE INCOMING DATA FOR VALID FORMAT TO AVOID SERVER CRASHING=============

        //Terminate connection on invalid auth token
        if (auth.authToken !== authData.authToken) {
            ws.send(JSON.stringify({
                status: 403,
                message: 'Invalid auth token provided',
                data: []
            }))
            ws.close()
            console.log(`Websocket connection closed due to invalid authToken...`)
        }

        //If authenticated...

        let returnData = {}

        //WaypointData
        const getWaypointData = () => {
            getLastWaypoint(authData.trackerId).then(result => {
                if (result.status == 'fail') {
                    returnData.waypoint = {
                        status: 500,
                        message: result.message,
                        data: null
                    }
                } else if (result.status == 'success') {
                    returnData.waypoint = {
                        status: 200,
                        message: null,
                        data: result.data
                    }
                }
            })
        }

        //ResolvedLocationData
        const getResolvedLocationData = () => {
            getLastResolvedLocation(authData.trackerId).then(result => {
                if (result.status == 'fail') {
                    returnData.resolvedLocation = {
                        status: 500,
                        message: result.message,
                        data: null
                    }
                } else if (result.status == 'success') {
                    returnData.resolvedLocation = {
                        status: 200,
                        message: null,
                        data: result.data
                    }
                }
            })
        }

        getWaypointData()
        getResolvedLocationData()

        const sendData = () => {
            ws.send(JSON.stringify({
                status: 200,
                message: null,
                data: returnData
            }))
        }

        interval = setInterval(sendData, 2000)
    })


    ws.on("close", function message(data) {
        interval != undefined ? clearInterval(interval) : null
        console.log('Socket closed');
    })
})