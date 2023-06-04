import { NextFunction, Request, Response } from "express";
import Joi from 'joi'
import ApiError from "../core/api.error";


export enum ValidationSource {
    BODY = "body",
    HEADER = "headers",
    QUERY = "query",
    PARAM = "params"
}

export const validator = (validateFn :(data: any , res:Response)=> Joi.ValidationResult 
    , source : ValidationSource = ValidationSource.BODY) => {
        return async (req : Request , res : Response , next : NextFunction)=>{
            const { error } = validateFn(req[source] , res);
            if( !error ) return next();

            // here handle delete file

            const { details } = error as Joi.ValidationError;
            const message = details.map(i => i.message.replace(/['"]+/g , '')).join(",");

            return next(new ApiError(message , 422))
        }
}