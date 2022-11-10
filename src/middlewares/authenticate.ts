import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responses";
import db from "../config/database";

import config from "../config";
import { CustomError } from "../utils/custom-error/CustomError";

/**
 * @class Authentication
 * @description authenticate token and roles
 * @exports Authentication
 */
export default class Authentication {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2) {
          const scheme = parts[0];
          const credentials = parts[1];
          if (/^Bearer$/i.test(scheme)) {
            const token = credentials;
            const decoded: any = await jwt.verify(token, config.JWT_KEY as string);
            const user = await db("users").first().where({ id: decoded.id });
            if (!user) {return next(new CustomError(404, 'Raw', "Account not found"));}
            req.user = user;
            return next();
          }
        } else {
          return next(new CustomError(401, 'Raw', "Invalid Authorisation format"));
        }
      } else {
        return next(new CustomError(401, 'Raw', "Authorisation not found"));
      }
    } catch (error: any) {
      return next(new CustomError(500, 'Raw', "Error", error));
    }
  }
}
