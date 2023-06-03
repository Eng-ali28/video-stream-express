import express,{Express , Request , Response} from "express"
import { join } from "path";
import prisma from "./db";
import morgan from "morgan"
export default function (app : Express){
    app.use(express.json({limit:"10mb"}));
    app.use(express.urlencoded({extended:true , limit:"10mb"}));
    app.use(express.static(join(__dirname , "../public")))
    app.use("/uploads",express.static("uploads"))

    app.use(morgan("dev"))

    prisma.$on("beforeExit", ()=>{
        console.log("db will be disconnect");
        process.exit(1)
    })

    app.get("/check" , (req:Request,res : Response)=>{
        res.status(200).json({
            msg:"Health check"
        })
    })
}