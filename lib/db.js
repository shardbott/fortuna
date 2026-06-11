import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  if (!process.env.MYSQL_URI) {
    throw new Error("A variável MYSQL_URI não está configurada.");
  }
  
  const dbconnection = await mysql.createConnection(process.env.MYSQL_URI);
  try {
    const [results] = await dbconnection.execute(query, values);
    await dbconnection.end();
    return results;
  } catch (error) {
    await dbconnection.end();
    throw error;
  }
}
