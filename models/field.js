var connection = require("../connection");

function Field() {

    this.findAllByUserid = function (criteria, callback) {
        connection.acquire(function (err, conn) {
            conn.query('select * from field where user_id = ?', criteria, function(err, results){
                conn.release();
                if(err){
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            });
        });
    }

    this.findById = function (criteria, callback) {
        connection.acquire(function (err, conn) {
            conn.query('select * from field where field_id = ?', criteria, function(err, results){
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


module.exports = new Field();