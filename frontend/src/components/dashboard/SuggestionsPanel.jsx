import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, HandHeart, Leaf, ArrowRight } from 'lucide-react';

const SuggestionsPanel = ({ suggestions }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const iconMap = {
    Zap,
    HandHeart,
    Leaf
  };

  const priorityStyles = {
    high: 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200',
    medium: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200',
    low: 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
  };

  const priorityDotColor = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">💡 Smart Suggestions</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {suggestions.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                backgroundColor: isHovered
                  ? 'rgba(59, 130, 246, 0.08)'
                  : 'rgba(0, 0, 0, 0)'
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border p-4 cursor-pointer relative group overflow-hidden ${priorityStyles[item.priority]}`}
            >
              {/* Animated background on hover */}
              <motion.div
                animate={{
                  scaleX: isHovered ? 1 : 0,
                  opacity: isHovered ? 0.1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-blue-400 origin-left"
              />

              {/* Content */}
              <div className="relative z-10 flex gap-3">
                {/* Left icon */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 pt-0.5"
                >
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  )}
                </motion.div>

                {/* Middle content */}
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">
                    {item.suggestion}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{item.action}</p>
                </div>

                {/* Priority indicator and arrow */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <motion.div
                    className={`h-2 w-2 rounded-full ${priorityDotColor[item.priority]}`}
                  />
                  <motion.div
                    animate={{
                      x: isHovered ? 4 : 0,
                      opacity: isHovered ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </motion.div>
                </div>
              </div>

              {/* Hover button indicator */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : -5
                }}
                transition={{ duration: 0.2 }}
                className="mt-3 pt-3 border-t border-current border-opacity-20"
              >
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Take Action <ArrowRight className="h-3 w-3" />
                </button>
              </motion.div>
            </motion.div>
          );
        })}

        {suggestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No suggestions at this time.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SuggestionsPanel;
