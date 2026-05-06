import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Trash2, Heart, Award } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  const actionIcons = {
    Consume: CheckCircle,
    Donate: Heart,
    Compost: Award,
    Waste: Trash2
  };

  const actionColors = {
    Consume: 'text-green-600 bg-green-50',
    Donate: 'text-blue-600 bg-blue-50',
    Compost: 'text-emerald-600 bg-emerald-50',
    Waste: 'text-red-600 bg-red-50'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">📋 Recent Activity</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {activities.map((activity, index) => {
          const IconComponent = actionIcons[activity.type] || CheckCircle;
          const isLast = index === activities.length - 1;

          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex gap-4">
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      type: 'spring',
                      stiffness: 200
                    }}
                    className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${actionColors[activity.type]}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.div>

                  {!isLast && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                        duration: 0.3
                      }}
                      className="w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-100 mt-2 origin-top"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-4 flex-1">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 + index * 0.08 }}
                  >
                    <p className="font-semibold text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No activities yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ActivityTimeline;
