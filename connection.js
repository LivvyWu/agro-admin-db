var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            port: '3308',
            user: 'root',
            password: 'rootpswd',
            database: 'agrodb'
        });
    };

    this.acquire = function(callback) {

        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Connection();