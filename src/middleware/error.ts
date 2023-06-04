
import { Request , Response , NextFunction } from "express";
import {StatusCodes} from "http-status-codes"
import ApiError from "../core/api.error";

export default function(error : Error , req:Request , res:Response ,next:NextFunction){

    if(error instanceof ApiError){
        res.status(error.httpStatus).json({
            success:false,
            status : error.httpStatus,
            message : error.message
        })
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        status:StatusCodes.INTERNAL_SERVER_ERROR,
        message : error.message
    })
}