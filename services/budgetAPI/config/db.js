module.exports = (mongoose, config) => {
    const db = mongoose.connection;

    mongoose.Promise = Promise;

    mongoose.connect(config.db, {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });

    db.on('error', err => console.log(`Connection to db failed: ${err}`));

    db.on('connected', () => console.log('Connected to db'));

    db.on('disconnected', () => console.log('Disconnected from db'));

    db.on('SIGINT', () => {
        db.close(() => {
            console.log('db terminated, connection closed');
            process.exit(0);
        })
    })
}