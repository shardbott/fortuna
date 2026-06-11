import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Conecta no MySQL usando a URL que vamos colocar na Vercel
  const dbconnection = await mysql.createConnection(process.env.MYSQL_URI);
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    dbconnection.end();
    console.error("Erro no BD:", error.message);
    return [];
  }
}
