import React from 'react';
import { LogicAnalysis } from '../types';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Scale, ArrowRightLeft, Spline } from 'lucide-react';

interface AnalysisPanelProps {
  analysis: LogicAnalysis;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  const { classification, conditionals } = analysis;

  const getClassColor = () => {
    switch (classification) {
      case 'TAUTOLOGY': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
      case 'CONTRADICTION': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800';
      default: return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    }
  };

  const getClassIcon = () => {
    switch (classification) {
      case 'TAUTOLOGY': return <ShieldCheck size={20} />;
      case 'CONTRADICTION': return <AlertTriangle size={20} />;
      default: return <Scale size={20} />;
    }
  };

  const getClassDesc = () => {
    switch (classification) {
      case 'TAUTOLOGY': return "This statement is always true, regardless of the truth values of its parts.";
      case 'CONTRADICTION': return "This statement is always false. It is logically impossible.";
      default: return "This is a contingency. It is true in some cases and false in others.";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Classification Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-3xl border ${getClassColor()} shadow-sm relative overflow-hidden`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-xl backdrop-blur-sm">
              {getClassIcon()}
            </div>
            <h3 className="font-display font-bold text-lg tracking-tight">{classification}</h3>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            {getClassDesc()}
          </p>
        </div>
      </motion.div>

      {/* Conditionals Card */}
      {conditionals && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-900 p-6 rounded-3xl shadow-sm border border-surface-200 dark:border-surface-800"
        >
          <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <ArrowRightLeft size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Related Forms</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-surface-100 dark:border-surface-800 pb-2">
              <span className="text-gray-500 font-medium">Converse</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{conditionals.converse}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-surface-100 dark:border-surface-800 pb-2">
              <span className="text-gray-500 font-medium">Inverse</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{conditionals.inverse}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Contrapositive</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{conditionals.contrapositive}</span>
            </div>
          </div>
        </motion.div>
      )}
      
      {!conditionals && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-50 dark:bg-surface-900/50 p-6 rounded-3xl border border-dashed border-surface-300 dark:border-surface-700 flex flex-col items-center justify-center text-center"
        >
           <Spline className="text-gray-400 mb-2" size={24} />
           <p className="text-sm text-gray-500">
             Try an implication (P → Q) to see its logical variations.
           </p>
        </motion.div>
      )}
    </div>
  );
};
