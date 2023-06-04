import { StatusCodes } from "http-status-codes";
import prisma from "../startup/db"
import ApiError from "../core/api.error";

export const getVideoById  = async (videoId : string)=>{
    const video = await prisma.video.findFirst({where : {id:videoId}});
    
    if(!video) throw new ApiError("Video with this id not found" , StatusCodes.NOT_FOUND)
   
    return video;
}

export const getVideoWithPagination  = async (pageNumber : number , pageSize : number )=>{
    const take = pageSize ? +pageSize : 5;
    const skip = (+pageNumber - 1) * take

    const videos = await prisma.video.findMany({take , skip});
    console.log(videos);
   
    return videos;
}