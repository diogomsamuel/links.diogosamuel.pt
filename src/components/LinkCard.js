import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

const LinkCard = ({ name, url, icon, description, priority = false, onClick }) => {
  // Se o contador de cliques for maior que 5, mostrar badge popular
  const handleClick = (e) => {
    // Executar o callback de onClick, se fornecido
    if (onClick) onClick(name);
  };

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`link-card ${priority ? 'priority-link' : ''}`}
      aria-label={name}
    >
      <motion.div 
        className="icon"
        whileHover={{ rotate: 5, scale: 1.1 }}
        whileTap={{ rotate: -5, scale: 0.9 }}
      >
        {icon}
      </motion.div>
      
      <div className="text">
        <h3>{name}</h3>
        {description && <p>{description}</p>}
      </div>
      
      <div className="right-area">
        <motion.div 
          className="arrow-indicator"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          <FaArrowRight />
        </motion.div>
      </div>
    </a>
  );
};

export default LinkCard; 