import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGlobe, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function SocialIcons() {
  const socialLinks = [
    {
      name: 'Website',
      url: 'https://diogosamuel.pt',
      icon: <FaGlobe size={18} className="icon" />,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/diogosamuel_',
      icon: <FaInstagram size={18} className="icon" />,
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@diogosamuel_',
      icon: <FaYoutube size={18} className="icon" />,
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@diogosamuel_',
      icon: <FaTiktok size={18} className="icon" />,
    },
    {
      name: 'X',
      url: 'https://x.com/diogosamuelpt',
      icon: <FaXTwitter size={18} className="icon" />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/diogosamuel',
      icon: <FaGithub size={18} className="icon" />,
    },
  ];

  return (
    <div className="flex justify-center gap-3 flex-wrap my-3">
      {socialLinks.map((social, index) => (
        <motion.div 
          key={social.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.05 + 0.15,
            duration: 0.3
          }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={social.name}
          >
            {social.icon}
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 