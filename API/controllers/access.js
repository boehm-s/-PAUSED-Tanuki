import sha1		from "sha1";
import auth		from "basic-auth";
import usersModel	from "./../models/user";

const authorize = roles => {
    return function checkRoles(req, res, next) {
	if (!req.hasOwnProperty('user'))
	    return getCurrentUser(req, res, next, checkRoles);
	if (roles.length == 1 && roles[0] == 'admin' && req.user.role != 'admin')
	    return res.status(403).end('You must be connected');
	else if (!roles.includes(req.user.role))
	    return res.status(401).end('You must be admin');
	else
	    return next();
    };
};

const getCurrentUser = async (req, res, next, checkRoles = null) => {
    let decoded = auth(req);
    if (!decoded)
	req.user = {
	    role: 'anonymous',
	    data: null
	};
    else {
	let user = await authenticateUser(decoded.name, decoded.pass);
	req.user = {
	    role: user ? user.role : 'anonymous',
	    data: user ? user : null
	};
    }

    return checkRoles ? checkRoles(req, res, next) : next();
};

const authenticateUser = async (email, password) => {
    let user = (await usersModel.getBy({email}))[0];
    return !user || user.password !== sha1(password)
	? false
	: user;
};

export default {authorize, getCurrentUser};
