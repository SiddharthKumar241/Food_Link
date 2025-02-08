const oracledb = require('oracledb');

const dbConfig = {
  user: "system",
  password: "DarkSister",
  connectString: "localhost:1521XE"
};

async function fetchFoodBankData() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT USER_ID, NAME, LATITUDE, LONGITUDE, DISTANCE, "Distance(Meters)"
       FROM Food_Bank`
    );
    console.log(result.rows);
    
    return result.rows;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { fetchFoodBankData };
