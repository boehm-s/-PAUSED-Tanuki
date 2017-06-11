import _	from 'lodash';

const checkObjectBody = (fieldsObj, req, res, next) => {
    const required = fieldsObj.required || [];
    const allowed = fieldsObj.allowed || [];

    if (_.isEqual(required.filter(field => req.body.hasOwnProperty(field)), required)) {
	req.body = (allowed.filter(el => required.includes(el)) !== required)
	    ? _.pick(req.body, required.concat(allowed))
	    : _.pick(req.body, allowed);
	return next();
    } else {
	const missingFields = required.filter(key => !req.body.hasOwnProperty(key));

	return res.status(400).json({message: `required fields: ${required}`, data: {missingFields}});
    }
};

const checkArrayBody = (fieldsObj, req, res, next) => {
    const required = fieldsObj.required || [];
    const allowed = fieldsObj.allowed || [];
    const missingFields = [];

    req.body = req.body.map(bodyPart => {
	if (_.isEqual(required.filter(field => bodyPart.hasOwnProperty(field)), required)) {
	    missingFields.push([]);
	    return (allowed.filter(el => required.includes(el)) !== required)
		? _.pick(bodyPart, required.concat(allowed))
		: _.pick(bodyPart, allowed);
	} else {
	    missingFields.push(required.filter(key => !bodyPart.hasOwnProperty(key)));
	    return {};
	}
    });

    return 0 < missingFields.filter(arr => 0 < arr.length).length
	? res.status(400).json({message: `required fields: ${required}`, data: {missingFields}})
	: next();

};

const body = fieldsObj => (req, res, next) => (req.body instanceof Array)
	  ? checkArrayBody(fieldsObj, req, res, next)
	  : checkObjectBody(fieldsObj, req, res, next);

const params = required => (req, res, next) => {
	if (_.isEqual(required.filter(param => req.params.hasOwnProperty(param)), required))
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

const query = fieldsObj => (req, res, next) => {
    const allowed = fieldsObj.allowed || [];
    const required = fieldsObj.required || [];
    const fieldFilter = (field) =>
	  req.query.hasOwnProperty(field)
	  && null !== req.query[field]
	  && ""  !== req.query[field];

    if (_.isEqual(required.filter(fieldFilter), required)) {
	req.query = (allowed.filter(el => required.includes(el)) !== required)
	    ? _.pick(req.query, required.concat(allowed))
	    : _.pick(req.query, allowed);
	return next();
    } else {
	const missingFields = Object.keys(req.query)
	      .filter(key => !required.includes(key))
	      .reduce((obj,key) => {
		  obj[key] = required[key];
		  return obj;
	      }, {});

	return res.status(400).json({message: `required params: ${required}`, data: {missingFields}});
    }
};


export default {body, params, query};
