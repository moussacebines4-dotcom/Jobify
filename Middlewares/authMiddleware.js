import { UnauthenticatedError, UnauthorizedError } from "../Errors/customeErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) { throw new UnauthenticatedError("authentication invalid") }
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role }
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid")
    }
    next()
}

export const authorizePermesion = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userId)) throw new UnauthorizedError("aunothoresed to access to this route")
        next()
    }
}