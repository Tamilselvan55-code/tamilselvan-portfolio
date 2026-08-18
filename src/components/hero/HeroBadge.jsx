import { motion } from 'framer-motion';
import { fadeUp } from './HeroAnimations';

export function HeroBadge() {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-bright opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-bright"></span>
      </span>
      <span className="text-sm font-body font-medium text-text-primary uppercase tracking-wider">Available for new commissions</span>
    </motion.div>
  );
}
