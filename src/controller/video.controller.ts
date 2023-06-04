import { Request , Response , NextFunction } from "express"
import {StatusCodes , ReasonPhrases} from "http-status-codes"

import * as videoServices from "../services/video.service"
import SuccessResponse from "../core/api.response";

export const getVideoById = async (req : Request  , res : Response , next : NextFunction)=>{
    try{
    const videoId  = req.params.id;

    const response = await videoServices.getVideoById(videoId);

    return new SuccessResponse(StatusCodes.OK , ReasonPhrases.OK , response).send(res)
    }catch(error){
        next(error)
    }
}

export const getVideos = async (req : Request  , res : Response , next : NextFunction)=>{

    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;

    const response = await videoServices.getVideoWithPagination(pageNumber , pageSize );

    return new SuccessResponse(StatusCodes.OK , ReasonPhrases.OK , response).send(res)
}