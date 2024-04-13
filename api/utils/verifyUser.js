import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401, "You need to login first"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {//this gives error or user.
        if(err) return next(errorHandler(403, "Token is not valid"));
        req.user = user;//add user to the request
        next();//if everything is alright we gonna go to the next function. Look in the route. You can see the next function is updateUser
    });

}