export const metadata = {
  title: 'Fortuna Cassino',
  description: 'Portal Premium de Apostas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #030704;
            background-image: radial-gradient(circle at 50% 0%, #0d2b14 0%, #030704 60%);
            color: #ffffff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .glass-panel {
            background: rgba(13, 43, 20, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(46, 204, 113, 0.15);
            border-radius: 24px;
            padding: 40px;
            width: 90%;
            max-width: 450px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05);
            margin: 0 auto;
            text-align: center;
          }
          .wallet-card {
            background: linear-gradient(180deg, rgba(22, 101, 52, 0.8) 0%, rgba(10, 46, 22, 0.9) 100%);
            border-radius: 16px;
            padding: 25px 20px;
            margin-top: 25px;
            border: 1px solid rgba(46, 204, 113, 0.2);
            box-shadow: inset 0 2px 15px rgba(0,0,0,0.3);
          }
          @media (max-width: 600px) {
            .glass-panel { padding: 30px 20px; border-radius: 20px; }
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
