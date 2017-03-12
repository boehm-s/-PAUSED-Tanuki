import usersModel from "./../models/users";

const getAll = (req, res, next) => {
    let allUsers = usersModel.getAll();
    res.json(allUsers);
};

export default {getAll};
