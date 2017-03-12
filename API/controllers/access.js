import usersModel from "./../models/users";


const authorize = roles => {
    return function checkRoles(req, res, next) {
	if (!req.hasOwnProperty('user'))
	    return getCurrentUser(req, res, next, checkRoles);
	if (!roles.includes(req.user.role))
	    return res.status(401).json({message: "You're not authorize to access this route."});
	else
	    return next();
    };
};

const getCurrentUser = async (req, res, next, checkRoles = null) => {
    let auth = req.get('Authorization');
    if (!auth)
	req.user = {
	    role: 'anonymous',
	    data: null
	};
    else {
	let user = await usersModel.getByToken(auth);
	req.user = {
	    role: user ? user.role : 'anonymous',
	    data: user ? user : null
	};
    }

    return checkRoles ? checkRoles(req, res, next) : next();
};

export default {authorize, getCurrentUser};
