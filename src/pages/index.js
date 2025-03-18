import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import LinkCard from "../components/LinkCard";
import SocialIcons from "../components/SocialIcons";
import { FaInstagram, FaYoutube, FaTiktok, FaXTwitter, FaGithub, FaGlobe, FaCode, FaBriefcase } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";

export default function Home() {
  const [timeTheme, setTimeTheme] = useState("");
  const [greeting, setGreeting] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Definir tema baseado na hora do dia
    const hour = new Date().getHours();
    let currentTheme = "";
    let currentGreeting = "";

    if (hour >= 5 && hour < 12) {
      currentTheme = "morning-mode";
      currentGreeting = "Bom dia!";
    } else if (hour >= 12 && hour < 18) {
      currentTheme = "afternoon-mode";
      currentGreeting = "Boa tarde!";
    } else if (hour >= 18 && hour < 22) {
      currentTheme = "evening-mode";
      currentGreeting = "Boa noite!";
    } else {
      currentTheme = "night-mode";
      currentGreeting = "Boa noite!";
    }

    setTimeTheme(currentTheme);
    setGreeting(currentGreeting);

    // Prefetch das imagens dos links populares
    const prefetchImages = [
      'https://diogosamuel.pt/images/profile.jpeg',
      'https://cdn-icons-png.flaticon.com/512/174/174855.png',
      'https://cdn-icons-png.flaticon.com/512/3670/3670151.png'
    ];
    
    prefetchImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
    });
  }, []);

  const handleLinkClick = (linkName) => {
    // Enviar o clique para a API (sem aguardar resposta para não bloquear a navegação)
    fetch('https://api.diogosamuel.pt/api/stats/links/add-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ linkName }),
      // Usado para permitir que a solicitação ocorra em segundo plano sem bloquear a navegação
      keepalive: true
    }).catch(error => {
      console.error('Erro ao registrar clique:', error);
    });
  };

  const links = [
    {
      name: "Instagram",
      url: "https://instagram.com/diogosvmuel",
      icon: <FaInstagram />,
      description: "Porque toda a gente precisa de validação social.",
      priority: true
    },
    {
      name: "Youtube",
      url: "https://youtube.com/@diogosvmuel",
      icon: <FaYoutube />,
      description: "Os vídeos que ninguém tem paciência para ver."
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@diogomsamuel",
      icon: <FaTiktok />,
      description: "Conteúdo de qualidade duvidosa em 15 segundos."
    },
    {
      name: "X",
      url: "https://x.com/diogosvmuel",
      icon: <FaXTwitter />,
      description: "Onde deito cá para fora o que me vai na cabeça."
    },
    {
      name: "Website",
      url: "https://diogosamuel.pt",
      icon: <FaGlobe />,
      description: "Acredita, um dia isto vai estar pronto."
    },
    {
      name: "Portfolio",
      url: "https://portfolio.diogosamuel.pt",
      icon: <FaBriefcase />,
      description: "Se quiseres ver o que faço quando trabalho."
    },
    {
      name: "GitHub",
      url: "https://github.com/diogomsamuel",
      icon: <FaGithub />,
      description: "Código que escrevo enquanto tento parecer ocupado."
    }
  ];

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15
      }
    }
  };

  return (
    <>
      <Head>
        <title>Diogo Samuel • Links</title>
        <meta name="description" content="Code, lift, repeat — building strength in both worlds." />
        <meta property="og:title" content="Diogo Samuel • Links" />
        <meta property="og:description" content="Code, lift, repeat — building strength in both worlds." />
        <meta property="og:image" content="https://diogosamuel.pt/images/profile.jpeg" />
        <meta property="og:url" content="https://links.diogosamuel.pt" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-PLACEHOLDER'}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-PLACEHOLDER'}');
          `,
        }}
      />

      <Layout className={timeTheme}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="relative mb-6">
            <div 
              className={`profile-image ${imageLoaded ? 'loaded-image' : 'loading-image'}`}
            >
              <Image
                src="https://diogosamuel.pt/images/profile.jpeg"
                alt="Diogo Samuel"
                width={180}
                height={180}
                priority
                onLoad={() => setImageLoaded(true)}
                unoptimized={true}
                className="profile-img"
              />
              <div className="profile-glow"></div>
            </div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="name-title text-2xl font-semibold">
            Diogo Samuel
          </motion.h1>

          <motion.div variants={fadeInUp}>
            <p className="profile-description mt-2">
              Code, lift, repeat — building strength in both worlds.
            </p>
            <div className="subtle-divider"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-full max-w-md mt-2 mb-6">
            <SocialIcons />
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mb-4">
            <p className="text-center mb-2 text-sm font-medium">
              <span className="greeting-badge">{greeting} Encontra-me online</span>
            </p>
          </motion.div>

          {links.map((link, index) => (
            <motion.div
              key={link.name}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <LinkCard
                name={link.name}
                url={link.url}
                icon={link.icon}
                description={link.description}
                priority={link.priority}
                onClick={() => handleLinkClick(link.name)}
              />
            </motion.div>
          ))}

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-xs opacity-50 italic text-center sarcastic-footer"
          >
            © {new Date().getFullYear()} Diogo Samuel • 
            &ldquo;Site feito com o mínimo esforço possível&rdquo;
            <Link 
              href="/statistics" 
              className="stats-link" 
              onContextMenu={(e) => {
                e.preventDefault();
                const adminSecret = prompt("Para acesso administrativo, digite sua senha:");
                if (adminSecret) {
                  window.location.href = `/statistics?admin=${adminSecret}`;
                }
              }}
            >
              📊
            </Link>
          </motion.p>
        </motion.div>
      </Layout>
    </>
  );
}
