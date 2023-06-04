import {Express} from "express"
import error from "../middleware/error"
import video from "../routes/video.routes"

export default function (app : Express){
    app.use("/api/videos" , video)
    app.use(error)
}