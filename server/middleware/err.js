import Errorhandler from "../utils/utility-class.js";

 const errorMiddleware = (
		err, 
		req, 
		res,
		next) => {
			

	const errMessage = err.message || "internal server error" ;
	const errStatus = err.statusCode || 500 ;
	res.status(errStatus).json({ message: errMessage });
}


export const TryCatch =
  (func) =>
  (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

export default errorMiddleware