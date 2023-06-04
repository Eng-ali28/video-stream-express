import prisma from "../src/startup/db";
import video from "./video";

async function seed(){
    for(let v of video){
        await prisma.video.create({
            data:v
        })
    }
}

seed().catch(()=>{
    process.exit(1)
})