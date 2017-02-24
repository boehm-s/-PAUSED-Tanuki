import usersModel from "./../models/users";

function getAll(req, res, next) {
    let allUsers = usersModel.getAll();
    res.json(allUsers);
}

export default {getAll};
