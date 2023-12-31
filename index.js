import { WebSocketServer } from "ws"
import { connectToDB } from './connectToDB.js'
import { getLastWaypoint } from "./coreFunction/getLastWaypoint.js"

const wss = new WebSocketServer({ port: 8080 })

connectToDB()

wss.on("connection", function connection(ws) {

    //Dummy data to bypass authentication
    const auth = {
        trackerId: 'ABC-123-DEF-456',
        authToken: 'tegw6637288jjchd'
    }

    ws.on("message", function message(data) {

        //Authentication - Every message is authenticated due to sensitivity of data returned.
        const authData = JSON.parse(data)

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
        let waypointData, resolvedLocationData, whetherData

        const sendLastWaypoint = () => {
            getLastWaypoint(authData.trackerId).then(result => {
                if (result.status == 'fail') {
                    waypointData = {
                        message: result.message,
                        data: null
                    }
                    ws.send(JSON.stringify({
                        status: 500,
                        message: result.message,
                        data: null
                    }))
                } else if (result.status == 'success') {
                    waypointData = {
                        message: null,
                        data: result.data
                    }
                    ws.send(JSON.stringify({
                        status: 200,
                        message: null,
                        data: {
                            waypoint: waypointData,
                            resolvedLocation: null,
                            weather: null
                        }
                    }))
                }
            }
            )
        }

        const interval = setInterval(sendLastWaypoint, 2000)
    })




    // ws.on("message", function message(data) {
    //     console.log("received: %s", data)
    // })
    // ws.send("something")
})