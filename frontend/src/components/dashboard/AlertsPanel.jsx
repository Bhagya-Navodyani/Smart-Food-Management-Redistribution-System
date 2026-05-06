import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, Lightbulb, Bell } from 'lucide-react';

const AlertsPanel = ({ alerts }) => {
  const iconMap = {
    AlertTriangle,
    XCircle,
    Lightbulb
  };

  const severityStyles = {
    critical: 'bg-red-50 border-red-200 text-red-900',
    high: 'bg-orange-50 border-orange-200 text-orange-900',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    low: 'bg-blue-50 border-blue-200 text-blue-900'
  };

  const severityIconStyles = {
    critical: 'text-red-600',
    high: 'text-orange-600',
    medium: 'text-yellow-600',
    low: 'text-blue-600'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const pulseVariants = {
    initial: { opacity: 0.8, scale: 1 },
    animate: {
      opacity: [0.8, 0.3, 0.8],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-900">Smart Alerts</h2>
        {alerts.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto inline-flex items-center justify-center h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full"
          >
            {alerts.length}
          </motion.span>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {alerts.map((alert) => {
          const IconComponent = iconMap[alert.icon];

          return (
            <motion.div
              key={alert.id}
              variants={itemVariants}
              className={`rounded-lg border p-4 flex gap-3 relative overflow-hidden ${severityStyles[alert.severity]}`}
            >
              {/* Pulse effect for critical alerts */}
              {alert.severity === 'critical' && (
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.05)'
                  }}
                />
              )}

              {/* Icon */}
              <div className="relative z-10 pt-0.5">
                <motion.div
                  animate={{
                    rotate: alert.severity === 'critical' ? [0, -5, 5, 0] : 0
                  }}
                  transition={{
                    duration: 2,
                    repeat: alert.severity === 'critical' ? Infinity : 0
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      className={`h-5 w-5 ${severityIconStyles[alert.severity]}`}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-xs opacity-75 mt-1">{alert.message}</p>
              </div>
            </motion.div>
          );
        })}

        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">✨ All clear! No urgent alerts.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AlertsPanel;
