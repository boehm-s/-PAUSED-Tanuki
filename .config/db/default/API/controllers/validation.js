const body = fieldsObj => {
    return (req, res, next) => {
	let allowed = fieldsObj.allowed || [];
	let required = fieldsObj.required || [];
	if (required.filter(field => req.body.hasOwnProperty(field)).equals(required)) {
	    req.body = (allowed.filter(el => required.includes(el)) != required)
		? req.body.pick(required.concat(allowed))
		: req.body.pick(allowed);
	    return next();
	} else {
	    let missingFields = Object.keys(req.body)
		    .filter(key => !required.includes(key))
		    .reduce((obj,key) => {
			obj[key] = required[key];
			return obj;
		    }, {});
	    return res.status(400).json({message: `required fields: ${required}`, data: {missingFields}});
	}
    };
};

const params = required => {
    return (req, res, next) => {
	if (required.filter(param => req.params.hasOwnProperty(param)).equals(required))
	    return next();
	else {
	    let missingParams = Object.keys(req.params)
		    .filter(key => !required.includes(key))
		    .reduce((obj,key) => {
			obj[key] = required[key];
			return obj;
		    }, {});

	    return res.status(400).json({message: `required params: ${required}`, data: {missingParams}});
	}
    };
};
