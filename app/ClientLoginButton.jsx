'use client';
import { signIn, signOut } from 'next-auth/react';

export default function ClientLoginButton({ session }) {
  if (session) {
    return (
      <button 
        onClick={() => signOut()} 
        style={{ 
          width: '100%', padding: '12px', marginTop: '20px', cursor: 'pointer', 
          backgroundColor: 'transparent', color: '#ef4444', 
          border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', 
          fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s'
        }}>
        Desconectar
      </button>
    );
  }
  return (
    <button 
      onClick={() => signIn('discord')} 
      style={{ 
        width: '100%', padding: '15px', cursor: 'pointer', 
        background: 'linear-gradient(90deg, #5865F2, #4752C4)', color: 'white', 
        border: 'none', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '600',
        boxShadow: '0 10px 20px -10px rgba(88, 101, 242, 0.6)'
      }}>
      Entrar com Discord
    </button>
  );
}
