// you can 'import' your db here or your ORM conf

function getAll() {
    //    let res = DB.query("SELECT * FROM users");
    //    let res = ORM.users.fetchAll();
    let res = [
	{id: 1, name: "DUPONT", firstname: "Antoine"},
	{id: 2, name: "DURAND", firstname: "Alexis"},
	{id: 3, name: "ALEXANDRE", firstname: "Romain"},
	{id: 4, name: "DELOUVE", firstname: "Mireille"}
    ];

    return res;
}

export default {getAll};
