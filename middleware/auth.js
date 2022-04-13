
import jwt from "jsonwebtoken";

import {secret} from '../shared/constants.js'
const auth = async (req, res, next) => {
  try {
   
    if ( req.path.includes('users'))
    next()
    else{
      const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {

      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    
    next();
  }

   
  } catch (error) {
   
    //console.log(error)
    res.status(401).send("Authentication failed.")
  }
};

export default auth;