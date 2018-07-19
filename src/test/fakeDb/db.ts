import MongodbMemoryServer from 'mongodb-memory-server';

export const testDbUrl = async () => {
    let mongod = new MongodbMemoryServer()
    return mongod.getConnectionString()
}
