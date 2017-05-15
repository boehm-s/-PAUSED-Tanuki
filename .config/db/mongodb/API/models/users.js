const mongoose = global.db;

const create = async (body) => {
    let user = new Users(body);
    let doc = await user.save();
    return body;
};

const getAll = async () => {
    let allUsers = await Users.find({});
    return allUsers;
};

const getBy = async (filter) => {
    try {
	var res = await Users.find(filter);
    } catch (e) {
	return {error: e};
    }

    return res;
};

const updateBy = async (filter, update) => {
    let bulk = Users.collection.initializeOrderedBulkOp();
    bulk.find(filter).update({$set: update});

    try {
        await bulk.execute();
        var updated = await Users.find(filter);
    } catch (e) {
        return {error: e};
    }

    return updated;
};

const deleteBy = async (filter) => {
    try {
        var removed = await Users.find(filter);
        await await Users.remove(filter);
    } catch (e) {
        return {error: e};
    }

    return removed;

};

export default { create, getAll, getBy, updateBy, deleteBy };
