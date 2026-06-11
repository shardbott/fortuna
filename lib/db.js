import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  if (!process.env.MYSQL_URI) {
    throw new Error("A variável MYSQL_URI não está configurada na Vercel.");
  }
  
  // Garante que o site aponta para o banco correto criado pelo bot
  const dbUrl = new URL(process.env.MYSQL_URI);
  if (dbUrl.pathname === '/' || dbUrl.pathname === '') {
    dbUrl.pathname = '/fortuna_db';
  }

  const dbconnection = await mysql.createConnection(dbUrl.toString());
  try {
    const [results] = await dbconnection.execute(query, values);
    await dbconnection.end();
    return results;
  } catch (error) {
    await dbconnection.end();
    console.error("Erro detalhado do BD:", error);
    throw error;
  }
}
