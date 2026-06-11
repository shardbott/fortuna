import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientLoginButton from "./ClientLoginButton"
import { query } from "../lib/db"

export default async function Home() {
  const session = await getServerSession(authOptions)
  let balance = 0;

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
    <main style={{ 
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% -20%, #113a1e 0%, #050a06 60%)', // O brilho verde no topo
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      
      {/* CABEÇALHO / LOGO */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <h1 style={{ 
           fontSize: '3rem', fontWeight: '800', margin: 0, letterSpacing: '-1px', 
           textShadow: '0 0 30px rgba(46, 204, 113, 0.4)' 
         }}>
           <span style={{ color: '#2ecc71' }}>🍀</span> Fortuna
         </h1>
         <p style={{ color: '#88a08f', fontSize: '1.1rem', margin: '5px 0 0 0', fontWeight: '500' }}>
           O cassino definitivo.
         </p>
      </div>

      {/* PAINEL CENTRAL (Efeito de Vidro) */}
      <div style={{ 
        background: 'rgba(10, 20, 12, 0.6)', 
        backdropFilter: 'blur(12px)', 
        border: '1px solid rgba(46, 204, 113, 0.15)', 
        borderRadius: '24px', 
        padding: '40px', 
        width: '100%', 
        maxWidth: '400px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(46, 204, 113, 0.05)',
        textAlign: 'center' 
      }}>
        
        {session ? (
          <>
            {/* PERFIL LOGADO */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
               <img 
                 src={session.user.image} 
                 alt="Avatar" 
                 style={{ 
                   borderRadius: '50%', width: '90px', height: '90px', 
                   border: '3px solid #166534', 
                   boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)' 
                 }} 
               />
            </div>
            <h2 style={{ margin: '15px 0 5px 0', fontSize: '1.5rem', fontWeight: '700' }}>
              {session.user.name}
            </h2>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>ID: {session.user.id}</p>

            {/* PAINEL DA CARTEIRA */}
            <div style={{ 
              background: 'linear-gradient(180deg, #166534 0%, #0a2e16 100%)', 
              borderRadius: '16px', 
              padding: '25px 20px', 
              marginTop: '25px', 
              border: '1px solid #1f7a40',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
            }}>
              <p style={{ margin: 0, color: '#a7f3d0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>
                Saldo Disponível
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '2.5rem', color: '#ffffff', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div style={{ marginTop: '30px' }}>
              <ClientLoginButton session={session} />
            </div>
          </>
        ) : (
          <>
             {/* ÁREA DESLOGADA */}
             <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  width: '80px', height: '80px', 
                  background: 'linear-gradient(135deg, #166534, #0a2e16)', 
                  borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  margin: '0 auto', fontSize: '2.5rem', 
                  boxShadow: '0 10px 25px rgba(22, 101, 52, 0.4)',
                  border: '1px solid #1f7a40'
                }}>
                  🔒
                </div>
             </div>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: '700' }}>
               Acesso Restrito
             </h3>
             <p style={{ color: '#88a08f', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5' }}>
               Conecte-se com segurança usando seu Discord para visualizar sua carteira e ter acesso aos jogos.
             </p>
             <ClientLoginButton session={session} />
          </>
        )}
      </div>
    </main>
  )
}
