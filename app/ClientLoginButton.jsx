'use client';
import { signIn, signOut } from 'next-auth/react';

export default function ClientLoginButton({ session }) {
  if (session) {
    return (
      <button 
        onClick={() => signOut()} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '5px' }}>
        Sair
      </button>
    );
  }
  return (
    <button 
      onClick={() => signIn('discord')} 
      style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '5px' }}>
      Entrar com Discord
    </button>
  );
}
