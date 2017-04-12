const body = fieldsObj => {
    return (req, res, next) => {
	let allowed = fieldsObj.allowed || [];
	let required = fieldsObj.required || [];
	if (required.filter(field => req.body.hasOwnProperty(field) && req.body[field] != null && req.body[field] != "").equals(required)) {
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
	    return res.status(400).end('An error occured');
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

	    return res.status(400).end('An error occured');
	}
    };
};

const query = fieldsObj => {
    return (req, res, next) => {
	let allowed = fieldsObj.allowed || [];
	let required = fieldsObj.required || [];
	if (required.filter(field => req.query.hasOwnProperty(field) && req.query[field] != null && req.query[field] != "").equals(required)) {
	    req.query = (allowed.filter(el => required.includes(el)) != required)
		? req.query.pick(required.concat(allowed))
		: req.query.pick(allowed);
	    return next();
	} else {
	    let missingFields = Object.keys(req.query)
		    .filter(key => !required.includes(key))
		    .reduce((obj,key) => {
			obj[key] = required[key];
			return obj;
		    }, {});
	    return res.status(400).end('An error occured');
	}
    };
};

export default {body, params, query};
