import { Response } from "express";
import Joi from 'joi'

export interface IDParam {
    id:string
}

export const vaildateUUID = (data:IDParam , res:Response)=>{
    const schema = {
        id : Joi.string().uuid({version:"uuidv4"}).required()
    }

    return Joi.object(schema).validate(data)
}

export interface pagination{
    pageNumber : number,
    pageSize:number
}

export const vaildatePagination= (data:pagination ,   res:Response)=>{
    const schema = {
        pageNumber : Joi.number().optional(),
        pageSize : Joi.number().optional(),
    }

    return Joi.object(schema).validate(data)
}
