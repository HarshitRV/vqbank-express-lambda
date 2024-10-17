import mongoose, { Mongoose } from "mongoose";
import getSecrets from "../../utils/getSecrets";

let conn: Mongoose;

async function connectDatabase(): Promise<mongoose.Mongoose> {
    try {
        const secrets = await getSecrets();
        const uri = secrets.MONGODB_URI;

        conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });

        return conn;
    } catch (error) {
        console.log('Database connection failed: ', error);
        throw error;
    }
}

async function disconnectDatabase(): Promise<void> {
    if (conn) {
        await conn.disconnect();
    }
}

export { connectDatabase, disconnectDatabase };