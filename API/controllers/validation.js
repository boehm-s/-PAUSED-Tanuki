const body = fieldsObj => {
    return (req, res, next) => {
	let allowed = fieldsObj.allowed || [];
	let required = fieldsObj.required || [];
	if (required.filter(field => req.body.hasOwnProperty(field)).equals(required)) {
	    req.body = (allowed.filter(el => required.includes(el)) != required)
		? req.body.pick(required.concat(allowed))
		: req.body.pick(allowed);
	    next();
	} else {
	    let missingFields = Object.keys(req.body)
		    .filter(key => !required.includes(key))
		    .reduce((obj,key) => {
			obj[key] = required[key];
			return obj;
		    }, {});
	    res.status(400).json({message: `required fields: ${required}`, data: {missingFields}});
	}
    };
};
