import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientLoginButton from "./ClientLoginButton"
import { query } from "../lib/db"

export default async function Home() {
  const session = await getServerSession(authOptions)
  let wallet = 0;
  let bank = 0;
  let dbError = false;

  if (session?.user?.id) {
    try {
      const users = await query({
        query: "SELECT wallet, bank FROM users WHERE user_id = ?",
        values: [session.user.id]
      });
      if (users && users.length > 0) {
        wallet = users[0].wallet;
        bank = users[0].bank;
      }
    } catch (error) {
      console.error(error);
      dbError = true;
    }
  }

  // Se não estiver logado, mostra a tela de bloqueio moderna
  if (!session) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ color: '#2ecc71', fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-1px' }}>Fortuna</h1>
          <p style={{ color: '#737373', fontSize: '1.1rem', marginBottom: '40px' }}>O seu portal de apostas.</p>
          <div style={{ padding: '30px', backgroundColor: '#171717', borderRadius: '16px', border: '1px solid #262626' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>Acesso Restrito</h2>
            <p style={{ color: '#a3a3a3', marginBottom: '25px', fontSize: '0.95rem' }}>Faça login com o Discord para acessar sua carteira e os jogos.</p>
            <ClientLoginButton session={session} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'system-ui, sans-serif', paddingBottom: '80px' }}>
      
      {/* HEADER (Perfil e Logo) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#0a0a0a', borderBottom: '1px solid #1f1f1f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={session.user.image} alt="Avatar" style={{ width: '45px', height: '45px', borderRadius: '12px', border: '2px solid #2ecc71' }} />
          <div>
            <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>{session.user.name}</h2>
            <span style={{ fontSize: '0.75rem', color: '#737373' }}>ID: {session.user.id}</span>
          </div>
        </div>
        <div style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
          Fortuna
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        
        {/* CARTEIRA E AÇÕES */}
        <section style={{ backgroundColor: '#121212', borderRadius: '16px', padding: '20px', border: '1px solid #262626', marginBottom: '25px' }}>
          <p style={{ color: '#a3a3a3', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>Saldo para Apostas</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0 0 20px 0', fontWeight: '800' }}>
            <span style={{ color: '#2ecc71' }}>R$</span> {wallet.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button style={{ backgroundColor: '#2ecc71', color: '#000', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer' }}>
              Depositar Ganhos
            </button>
            <button style={{ backgroundColor: '#262626', color: '#fff', border: '1px solid #404040', padding: '14px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}>
              Sacar
            </button>
          </div>
          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #262626', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#737373', fontSize: '0.9rem' }}>Cofre (Banco):</span>
            <span style={{ fontWeight: '600' }}>R$ {bank.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </section>

        {/* ESTATÍSTICAS (Mock visual para ser integrado depois) */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#121212', borderRadius: '12px', padding: '15px', border: '1px solid #262626' }}>
            <p style={{ color: '#737373', fontSize: '0.8rem', margin: '0 0 5px 0' }}>Taxa de Vitória</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#3b82f6' }}>68.5%</p>
          </div>
          <div style={{ backgroundColor: '#121212', borderRadius: '12px', padding: '15px', border: '1px solid #262626' }}>
            <p style={{ color: '#737373', fontSize: '0.8rem', margin: '0 0 5px 0' }}>Lucro Total</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#2ecc71' }}>+ R$ 4.250</p>
          </div>
        </section>

        {/* JOGOS DISPONÍVEIS */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#e5e5e5' }}>Jogos Exclusivos</h3>
        <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '30px' }}>
          
          {/* AVIATOR */}
          <div style={{ backgroundColor: '#171717', border: '1px solid #ef4444', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#fff' }}>Aviator</h4>
              <p style={{ color: '#a3a3a3', fontSize: '0.85rem', margin: 0 }}>Multiplique seus ganhos antes de voar.</p>
            </div>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', color: '#ef4444' }}>✈️</span>
            </div>
          </div>

          {/* MINES */}
          <div style={{ backgroundColor: '#171717', border: '1px solid #f59e0b', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#fff' }}>Mines</h4>
              <p style={{ color: '#a3a3a3', fontSize: '0.85rem', margin: 0 }}>Caminhe pelo campo minado com cautela.</p>
            </div>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', color: '#f59e0b' }}>💣</span>
            </div>
          </div>

          {/* BLACKJACK */}
          <div style={{ backgroundColor: '#171717', border: '1px solid #3b82f6', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#fff' }}>Blackjack</h4>
              <p style={{ color: '#a3a3a3', fontSize: '0.85rem', margin: 0 }}>Chegue o mais perto do 21 sem estourar.</p>
            </div>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>🃏</span>
            </div>
          </div>

        </section>

        {/* LOGOUT AREA */}
        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '20px' }}>
          <ClientLoginButton session={session} />
        </div>

      </div>
    </main>
  )
}
