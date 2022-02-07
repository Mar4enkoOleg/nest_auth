import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DecodeMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization === undefined ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      throw new UnauthorizedException('No token');
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'jwt_secret', (err, data) => {
      if (err) console.log(err);
      else {
        req.user = data;
      }
    });

    next();
  }
}
