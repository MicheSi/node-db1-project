const db = require('./dbConfig');

module.exports = {
    getAll(query) {
        const dbQuery = db('accounts');

        if (query.limit && query.limit >=1) {
            dbQuery.limit(query.limit)
        }
        if (query.sortby) {
            dbQuery.orderBy(query.sortby, query.sortdir)
        }
        return dbQuery;
    }
}