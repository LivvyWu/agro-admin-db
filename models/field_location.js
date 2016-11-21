var connection = require("../connection");

function Field_Location() {



    this.findById = function (criteria, callback) {
        connection.acquire(function (err, conn) {
            conn.query('select * from field_location where fel_id = ?', criteria, function(err, results){
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


module.exports = new Field_Location();