import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { FaArrowLeft, FaTrash, FaServer } from "react-icons/fa6";

export default function Statistics() {
  // Estado para estatísticas globais (do servidor)
  const [globalStats, setGlobalStats] = useState({
    totalClicks: 0,
    linksCount: 0,
    mostClickedLink: { name: '', count: 0 }
  });
  const [globalLinks, setGlobalLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { admin } = router.query;
  
  // Verifica se o código admin da URL corresponde à variável de ambiente
  const isAdmin = admin === process.env.NEXT_PUBLIC_ADMIN_SECRET;

  // Buscar estatísticas globais da API
  useEffect(() => {
    async function fetchGlobalStats() {
      try {
        setLoading(true);
        const response = await fetch('https://api.diogosamuel.pt/api/stats/links/get-stats');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setGlobalStats(data.stats);
          setGlobalLinks(data.links);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Failed to fetch global stats:', err);
        setError('Não foi possível carregar as estatísticas globais. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchGlobalStats();
  }, []);

  const resetGlobalStats = async () => {
    if (!isAdmin) return;
    
    if (confirm('ATENÇÃO: Você está prestes a limpar TODAS as estatísticas globais. Esta ação não pode ser desfeita. Continuar?')) {
      try {
        const response = await fetch('https://api.diogosamuel.pt/api/stats/links/reset-stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminSecret: admin }),
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Recarregar a página para atualizar os dados
          window.location.reload();
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Failed to reset global stats:', err);
        alert('Erro ao resetar estatísticas globais: ' + err.message);
      }
    }
  };

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
        <title>Estatísticas • Diogo Samuel</title>
        <meta name="description" content="Estatísticas de cliques dos links" />
        <meta name="robots" content="noindex" />
      </Head>

      <Layout>
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
          <motion.div variants={fadeInUp} className="w-full flex justify-between items-center mb-8">
            <Link href="/" className="back-button">
              <FaArrowLeft /> Voltar
            </Link>
            <h1 className="text-2xl font-semibold">Estatísticas</h1>
            <div className="w-6"></div> {/* Espaçador para equilibrar o layout */}
          </motion.div>

          {/* Estatísticas Globais */}
          <motion.div variants={fadeInUp} className="stats-card w-full mb-6">
            <h2 className="flex items-center">
              <FaServer className="mr-2" /> Estatísticas Globais
            </h2>
            
            {loading ? (
              <div className="loading-indicator">Carregando estatísticas globais...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total de Cliques</span>
                    <span className="stat-value">{globalStats.totalClicks}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Link Mais Clicado</span>
                    <span className="stat-value">{globalStats.mostClickedLink.name || 'Nenhum'}</span>
                    <span className="stat-subvalue">{globalStats.mostClickedLink.count} cliques</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Links Rastreados</span>
                    <span className="stat-value">{globalStats.linksCount}</span>
                  </div>
                </div>

                <h3 className="stats-subheader">Cliques por Link (Global)</h3>
                <div className="links-list">
                  {globalLinks.length > 0 ? (
                    globalLinks.map((link) => (
                      <div key={link.name} className="link-stat-item">
                        <span className="link-name">{link.name}</span>
                        <span className="link-count">{link.count} {link.count === 1 ? 'click' : 'clicks'}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">Nenhum click registrado ainda</p>
                  )}
                </div>
              </>
            )}
          </motion.div>

          {isAdmin && (
            <motion.div variants={fadeInUp} className="admin-actions">
              <button onClick={resetGlobalStats} className="reset-stats-btn">
                <FaTrash /> Limpar Estatísticas Globais
              </button>
            </motion.div>
          )}
        </motion.div>
      </Layout>
    </>
  );
} 