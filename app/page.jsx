import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientLoginButton from "./ClientLoginButton"
import { query } from "../lib/db"

export default async function Home() {
  const session = await getServerSession(authOptions)
  let balance = 0;
  let dbError = false;

  if (session?.user?.id) {
    try {
      const users = await query({
        query: "SELECT wallet FROM users WHERE user_id = ?",
        values: [session.user.id]
      });
      
      if (users && users.length > 0) {
        balance = users[0].wallet;
      }
    } catch (error) {
      console.error(error);
      dbError = true;
    }
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
      
      {/* CABEÇALHO */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: 0, letterSpacing: '-1px', textShadow: '0 0 30px rgba(46, 204, 113, 0.3)' }}>
           <span style={{ color: '#2ecc71' }}>Fortuna</span>
         </h1>
         <p style={{ color: '#88a08f', fontSize: '1.1rem', margin: '5px 0 0 0', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
           Portal Premium
         </p>
      </div>

      <div className="glass-panel">
        {session ? (
          <>
            {/* PERFIL LOGADO */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
               <img 
                 src={session.user.image} 
                 alt="Perfil" 
                 style={{ borderRadius: '50%', width: '90px', height: '90px', border: '3px solid #166534', boxShadow: '0 0 25px rgba(46, 204, 113, 0.2)' }} 
               />
            </div>
            <h2 style={{ margin: '15px 0 5px 0', fontSize: '1.5rem', fontWeight: '700' }}>
              {session.user.name}
            </h2>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>ID: {session.user.id}</p>

            {dbError ? (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '10px', color: '#ef4444', fontSize: '0.9rem' }}>
                Falha ao sincronizar com o servidor. Por favor, verifique as configurações da base de dados.
              </div>
            ) : (
              <div className="wallet-card">
                <p style={{ margin: 0, color: '#a7f3d0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>
                  Saldo Disponível
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '2.5rem', color: '#ffffff', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              <ClientLoginButton session={session} />
            </div>
          </>
        ) : (
          <>
             {/* ÁREA DESLOGADA */}
             <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  width: '70px', height: '70px', 
                  background: 'linear-gradient(135deg, rgba(22, 101, 52, 0.5), rgba(10, 46, 22, 0.5))', 
                  borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  margin: '0 auto',
                  boxShadow: '0 10px 25px rgba(22, 101, 52, 0.2)',
                  border: '1px solid rgba(31, 122, 64, 0.5)'
                }}>
                  {/* Ícone de Cadeado SVG */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
             </div>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: '700' }}>
               Acesso Restrito
             </h3>
             <p style={{ color: '#88a08f', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5' }}>
               Autentique-se de forma segura para aceder à sua carteira e aos recursos do portal.
             </p>
             <ClientLoginButton session={session} />
          </>
        )}
      </div>
    </main>
  )
}
