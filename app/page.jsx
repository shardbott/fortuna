import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientLoginButton from "./ClientLoginButton"
import { query } from "../lib/db"

export default async function Home() {
  const session = await getServerSession(authOptions)
  let balance = 0;

  // Se o cara estiver logado, busca o saldo no banco de dados
  if (session?.user?.id) {
    const users = await query({
      query: "SELECT wallet FROM users WHERE user_id = ?",
      values: [session.user.id]
    });
    
    if (users.length > 0) {
      balance = users[0].wallet;
    }
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎰 Fortuna Cassino</h1>
      
      {session ? (
        <div style={{ textAlign: 'center', marginTop: '20px', backgroundColor: '#2f3136', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <img src={session.user.image} alt="Avatar" style={{ borderRadius: '50%', width: '120px', border: '4px solid #5865F2' }} />
          <h2 style={{ margin: '15px 0 5px 0' }}>{session.user.name}</h2>
          
          <div style={{ backgroundColor: '#202225', padding: '15px', borderRadius: '10px', marginTop: '15px' }}>
            <p style={{ margin: 0, color: '#b9bbbe', fontSize: '14px', textTransform: 'uppercase' }}>Saldo na Carteira</p>
            <p style={{ margin: 0, fontSize: '32px', color: '#43b581', fontWeight: 'bold' }}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ) : (
        <p style={{ color: '#b9bbbe' }}>Conecte-se com seu Discord para ver seu saldo e jogar!</p>
      )}

      <ClientLoginButton session={session} />
    </main>
  )
}
