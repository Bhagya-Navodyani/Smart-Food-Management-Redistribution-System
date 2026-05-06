import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap, Gift, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const actions = [
    {
      id: 1,
      icon: Plus,
      label: 'Add Food',
      color: 'from-blue-600 to-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/customer/food-list'
    },
    {
      id: 2,
      icon: Zap,
      label: 'Take Action',
      color: 'from-amber-600 to-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      path: '/customer/actions'
    },
    {
      id: 3,
      icon: Gift,
      label: 'Donate',
      color: 'from-rose-600 to-rose-500',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      path: '/customer/donations'
    },
    {
      id: 4,
      icon: ShoppingCart,
      label: 'Marketplace',
      color: 'from-emerald-600 to-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      path: '/customer/marketplace'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isHovered = hoveredIndex === index;

          return (
            <motion.button
              key={action.id}
              variants={buttonVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(action.path)}
              className="relative group"
            >
              {/* Floating animation on hover */}
              <motion.div
                animate={{
                  y: isHovered ? -8 : 0,
                  boxShadow: isHovered
                    ? '0 12px 24px rgba(0, 0, 0, 0.15)'
                    : '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer overflow-hidden relative ${action.bgColor} border border-gray-100 transition-all duration-300 hover:border-gray-200`}
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-r ${action.color}`}
                />

                {/* Ripple effect on click */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${action.color} pointer-events-none`}
                />

                {/* Content */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${action.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </motion.div>

                <motion.span
                  animate={{
                    color: isHovered
                      ? action.textColor.split('-')[1]
                      : '#6B7280'
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-sm font-semibold text-gray-700"
                >
                  {action.label}
                </motion.span>

                {/* Arrow indicator on hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : -4
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 mt-1"
                >
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </motion.div>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActions;
