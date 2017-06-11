const body = fieldsObj => (req, res, next) => {
    const allowed = fieldsObj.allowed || [];
    const required = fieldsObj.required || [];

    if (required.filter(field => req.body.hasOwnProperty(field)).equals(required)) {
	req.body = (allowed.filter(el => required.includes(el)) !== required)
	    ? req.body.pick(required.concat(allowed))
	    : req.body.pick(allowed);
	return next();
    } else {
	const missingFields = Object.keys(req.body)
	    .filter(key => !required.includes(key))
	    .reduce((obj,key) => {
		obj[key] = required[key];
		return obj;
	    }, {});

	return res.status(400).json({message: `required fields: ${required}`, data: {missingFields}});
    }
};

const params = required => (req, res, next) => {
    if (required.filter(param => req.params.hasOwnProperty(param)).equals(required))
	return next();
    else {
	const missingParams = Object.keys(req.params)
	    .filter(key => !required.includes(key))
	    .reduce((obj,key) => {
		obj[key] = required[key];
		return obj;
	    }, {});

	return res.status(400).json({message: `required params: ${required}`, data: {missingParams}});
    }
};

export default {body, params};
