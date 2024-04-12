import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req,res,next) => {

    const {token} = req.cookies;

    jwt.verify(token,TOKEN_SECRET,(err,user) => {
        if(err) return res.status(401).json({message: "token invalido"});
        req.user = user
        next();
    })
}