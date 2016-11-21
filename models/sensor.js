var connection = require("../connection");

function Sensor() {

    this.findByFieldId = function (criteria, callback) {
        connection.acquire(function (err, conn) {
            conn.query('select * from sensor where field_id = ?', criteria, function(err, results){
                conn.release();
                if(err){
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            });
        });
    }

}


module.exports = new Sensor();