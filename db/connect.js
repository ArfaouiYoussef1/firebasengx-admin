import mongoose from 'mongoose';
import config from '../config/index';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await mongoose.connect(config.database, { useMongoClient: true });
    }
    catch (err) {
    }
};

export default connectToDb;
