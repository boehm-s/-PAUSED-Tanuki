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

const updateBy = async (filter) => {

};

const deleteBy = async (filter) => {

};

export default { create, getAll, getBy, updateBy, deleteBy };
