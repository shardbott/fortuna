export const metadata = {
  title: 'Fortuna Cassino',
  description: 'O cassino oficial do bot Fortuna',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ 
        backgroundColor: '#050a06', /* Fundo super escuro, quase preto com toque esverdeado */
        color: '#ffffff', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}>
        {children}
      </body>
    </html>
  )
}
