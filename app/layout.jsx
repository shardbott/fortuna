export const metadata = {
  title: 'Fortuna Cassino',
  description: 'O cassino oficial do bot Fortuna',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#121212', color: '#ffffff', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
