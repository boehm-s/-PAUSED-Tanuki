const extendNativeObjects = () => {
    Object.prototype.pick = function(keys) {
	return Object.keys(this)
	    .filter(key => keys.includes(key))
	    .reduce((obj, key) => {
		obj[key] = this[key];
		return obj;
	    }, {});
    };

    Array.prototype.equals = array => {
	if (!array || this.length != array.length)
	    return false;

	var i, l;
	for (i = 0, l = this.length; i < l; i++) {
	    if (this[i] instanceof Array && array[i] instanceof Array)
		if (!this[i].equals(array[i]))
		    return false;
	    else if (this[i] != array[i])
		return false;
	}
	return true;
    };

};

export default {extendNativeObjects};
