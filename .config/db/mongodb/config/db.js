import mongoose		from 'mongoose';

const initDB = async () => {
    mongoose.connect('mongodb://localhost/tanuki');

    userSchemaInit();
    roleSchemaInit();

    global.db = mongoose;
    return true;
};


const userSchemaInit = _ => {
    let userSchema = new mongoose.Schema({
        firstname: 'string',
        lastname: 'string',
        email: 'string',
        birthdate: 'number',
        password: 'string',
        role: 'number'
    });

    mongoose.model('Users', userSchema);
};

const roleSchemaInit = _ => {
   let roleSchema = new mongoose.Schema({
        role: 'string',
        description: 'string'
    });

    mongoose.model('Role', roleSchema);
};

export default {initDB};
