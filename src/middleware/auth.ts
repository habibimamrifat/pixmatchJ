import { NextFunction, Request, Response } from 'express';
import asyncCatch from '../util/asyncCatch';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TRole } from '../modules/users/user.interface';


const auth = (...requeredUserRole: TRole[]) => {
  return asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const authorizatioToken = req?.headers?.authorization;

    console.log(authorizatioToken);

    if (!authorizatioToken) {
      throw Error('UnAuthorised User');
    }

    const decoded = jwt.verify(
      authorizatioToken,
      config.jwtTokennSecret as string,
    );

    console.log("dcoded",decoded)

    if (!decoded) {
      throw Error('tocan decodaing Failed');
    }

    const { role } = decoded as JwtPayload;

    if (requeredUserRole && !requeredUserRole.includes(role)) {
      throw Error('UnAuthorised User');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
