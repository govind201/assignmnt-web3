import {Request, Response, NextFunction} from 'express';
export default function catchAsyncErrors(middleware) {
    return async function(req:Request, res:Response, next:NextFunction) {
      try {
        await middleware(req, res, next);
      } catch(err) {
        next(err);
      }
    };
  }
  