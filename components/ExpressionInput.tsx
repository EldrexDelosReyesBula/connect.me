import React from 'react';
import { Play, ArrowRight, ArrowLeftRight } from 'lucide-react';

interface ExpressionInputProps {
  value: string;
  onChange: (val: string) => void;
  isValid: boolean;
  onGenerate: () => void;
}

export const ExpressionInput: React.FC<ExpressionInputProps> = ({ 
  value, 
  onChange, 
  isValid, 
  onGenerate 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      onGenerate();
    }
  };

  const insertSymbol = (sym: string) => {
    // Simple append for now, could be cursor aware in future
    onChange(value + sym);
    // Focus input? 
    const input = document.getElementById('expr-input');
    if (input) input.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className={`
        absolute -inset-0.5 rounded-2xl blur opacity-30 transition duration-500
        ${isValid ? 'bg-gradient-to-r from-primary-400 to-purple-400 group-hover:opacity-60' : 'bg-red-400 opacity-20'}
      `}></div>
      
      <div className="relative bg-white dark:bg-surface-900 rounded-2xl shadow-xl flex flex-col border border-surface-200 dark:border-surface-800 transition-colors">
        <div className="flex items-center p-2">
            <input
            id="expr-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Try (P -> Q) & (Q -> R)"
            className="w-full bg-transparent border-none outline-none px-4 py-4 text-xl md:text-2xl font-mono text-gray-800 dark:text-gray-100 placeholder-gray-400"
            autoFocus
            spellCheck={false}
            />
            
            <div className="pr-2">
            <button
                onClick={onGenerate}
                disabled={!isValid || !value.trim()}
                className={`
                p-3 rounded-xl flex items-center justify-center transition-all duration-300
                ${isValid && value.trim() 
                    ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg hover:shadow-primary-500/30 scale-100' 
                    : 'bg-surface-200 dark:bg-surface-800 text-gray-400 cursor-not-allowed scale-95'}
                `}
            >
                <Play size={24} fill={isValid && value.trim() ? "currentColor" : "none"} className={isValid ? "ml-1" : ""} />
            </button>
            </div>
        </div>

        {/* Quick Insert Toolbar */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
            {[
                { label: '→', val: '->', tooltip: 'Implication' },
                { label: '↔', val: '<->', tooltip: 'Biconditional' },
                { label: '¬', val: '!', tooltip: 'NOT' },
                { label: '∧', val: '&', tooltip: 'AND' },
                { label: '∨', val: '|', tooltip: 'OR' },
                { label: '⊕', val: '^', tooltip: 'XOR' },
                { label: '(', val: '(' },
                { label: ')', val: ')' },
            ].map((btn) => (
                <button
                    key={btn.val}
                    onClick={() => insertSymbol(btn.val)}
                    title={btn.tooltip}
                    className="px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-sm font-mono text-gray-600 dark:text-gray-300 transition-colors"
                >
                    {btn.label}
                </button>
            ))}
        </div>
      </div>
      
      {/* Helper Legend */}
      <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4 text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span>& = AND</span>
        <span>| = OR</span>
        <span>! = NOT</span>
        <span>^ = XOR</span>
        <span>{`->`} = IMPLIES</span>
      </div>
    </div>
  );
};
