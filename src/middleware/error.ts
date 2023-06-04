
import { Request , Response , NextFunction } from "express";
import {StatusCodes} from "http-status-codes"
import ApiError from "../core/api.error";

export default function(error : Error , req:Request , res:Response ,next:NextFunction){
    console.log("here");

    if(error instanceof ApiError){
        console.log("here");
        
        return res.status(error.httpStatus).send({
            success:false,
            status : error.httpStatus,
            message : error.message
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success:false,
        status:StatusCodes.INTERNAL_SERVER_ERROR,
        message : error.message
    })
}