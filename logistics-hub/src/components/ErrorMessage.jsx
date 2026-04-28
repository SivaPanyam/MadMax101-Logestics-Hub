import { AlertCircle, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function ErrorMessage() {
  const { error, clearError } = useStore();

  return (
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div className="bg-[var(--color-status-critical)] text-white p-4 rounded-[var(--radius-lg)] shadow-2xl flex items-start gap-4 border border-white/20">
            <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-sm uppercase tracking-wider">System Connection Error</h4>
              <p className="text-sm opacity-90 mt-1">{error}</p>
            </div>
            <button 
              onClick={clearError}
              className="p-1 hover:bg-black/10 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
