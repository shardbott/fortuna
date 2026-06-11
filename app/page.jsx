import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientLoginButton from "./ClientLoginButton"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
      <h1>🎰 Bem-vindo ao Fortuna Cassino</h1>
      
      {session ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Logado como: <strong>{session.user.name}</strong></p>
          <img src={session.user.image} alt="Avatar" style={{ borderRadius: '50%', width: '100px', margin: '10px 0' }} />
        </div>
      ) : (
        <p>Conecte-se com seu Discord para ver seu saldo e jogar!</p>
      )}

      <ClientLoginButton session={session} />
    </main>
  )
}
