import mongoose		from 'mongoose';

const initDB = async () => {
    mongoose.connect('mongodb://localhost/tanuki');
    global.db = mongoose;
    return true;
};

export default {initDB};
