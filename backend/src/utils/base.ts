import { NextFunction, Request, Response } from "express";

export type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Catching Errors in Async Functions
export const runAsync = (fn: AsyncMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};

// All of the response should have the following things
interface ResponseMsg {
  statusCode: number;
  isError: boolean;
  msg: string;
  data?: { [key: string]: any };
}

// All of the responses should be send using this function
// Middlewares shouldn't use this as this send response to the client
export const responseMsg = (res: Response, options: ResponseMsg): void => {
  const { statusCode, isError, msg, data } = options;
  res.status(statusCode).json({ isError, msg, data });
};
