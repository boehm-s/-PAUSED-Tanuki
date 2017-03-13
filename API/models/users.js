// you can 'import' your db here or your ORM conf

var users = [
    {id: 1, role: "user", name: "DUPONT", firstname: "Antoine", token: "6dsf4g3vc"},
    {id: 2, role: "admin", name: "DURAND", firstname: "Alexis", token: "erg7332"},
    {id: 3, role: "user", name: "ALEXANDRE", firstname: "Romain", token: "asf687s"},
    {id: 4, role: "user", name: "DELOUVE", firstname: "Mireille", token: "svd87d98a7"}
];

const getAll = () => {
    //    let res = DB.query("SELECT * FROM users");
    //    let res = ORM.users.fetchAll();

    return users;
};

const getByToken = async (token) => {
    return users.filter(user => user.token == token)[0];
};

const create = async (body, token) => {
    body.token = token;
    users.push(body);
    return body;
};

export default {getAll, getByToken, create};
