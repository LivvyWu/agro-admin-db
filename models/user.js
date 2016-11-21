var connection = require("../connection");

function User() {

    this.login = function (criteria, callback) {
        connection.acquire(function (err, conn) {
            conn.query('select user_id, account from account where email = ? and password = ?', criteria, function(err, results){
                conn.release();
                if(err){
                    callback(err, null);
                } else {
                    callback(null, results[0]);
                }
            });
        });
    }

}


module.exports = new User();