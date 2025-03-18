import React from 'react';
import Head from 'next/head';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children, className }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen premium-background ${className || ''}`}>
      <Head>
        <title>Diogo Samuel • Links</title>
        <meta name="description" content="Links para todas as redes sociais e conteúdos de Diogo Samuel" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="Diogo Samuel • Links" />
        <meta property="og:description" content="Links para todas as redes sociais e conteúdos de Diogo Samuel" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://links.diogosamuel.pt" />
        <meta property="og:image" content="https://links.diogosamuel.pt/images/profile.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="noise-overlay"></div>
      
      <div className="flex flex-col min-h-screen justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <main className="flex flex-col py-16 px-2 items-center flex-grow">
          {children}
        </main>
        
        <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-80"></div>
        <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
} 