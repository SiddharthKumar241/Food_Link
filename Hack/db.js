const oracledb = require('oracledb');

const dbConfig = {
    user: 'SYSTEM',
    password: 'DarkSister',
    connectString: 'localhost/XEPDB1'
};
async function insertLocation(userId, name, latitude, longitude) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log("Connected to DB");
        
        console.log("Inserting data:", { userId, name, latitude, longitude });

        await connection.execute(
            `INSERT INTO SYSTEM.RECEIVER (USER_ID, NAME, LATITUDE, LONGITUDE) VALUES (:userId, :name, :latitude, :longitude)`,
            { userId, name, latitude, longitude },
            { autoCommit: true }
        );
        console.log("Location stored successfully");
    } catch (err) {
        //console.error("Error storing location:", err.message);
    } finally {
        if (connection) await connection.close();
    }
}


module.exports = { insertLocation };
