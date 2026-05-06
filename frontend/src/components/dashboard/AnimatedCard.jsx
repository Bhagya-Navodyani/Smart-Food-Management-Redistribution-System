import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ icon: Icon, title, value, color, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Count up animation using motion.div with custom animate
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden"
    >
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 20px 40px ${color}40`
            : '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl bg-gradient-to-br from-white to-gray-50 p-5 border border-gray-100`}
      >
        {/* Animated background glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 rounded-xl`}
          style={{ backgroundColor: color }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
              className="h-5 w-5 rounded-full p-1 flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </motion.div>
          </div>

          {/* Animated number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
            className="mt-3"
          >
            <div className="text-3xl font-bold text-gray-900">{value}</div>
          </motion.div>

          {/* Bottom accent bar */}
          <motion.div
            animate={{
              scaleX: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="mt-3 h-1 w-12 rounded-full origin-left"
            style={{ backgroundColor: color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCard;
