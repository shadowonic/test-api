import MongodbMemoryServer from 'mongodb-memory-server';
import { DB_TEST_PORT } from '../../config'

export const testConnection = async () => {
    let mongod = await new MongodbMemoryServer({
        instance: {
            port: 27000,
            dbName: 'pro-net'
        }
    })
    return mongod
}

// mongodb://pro-net-api-db:27000/pro-net