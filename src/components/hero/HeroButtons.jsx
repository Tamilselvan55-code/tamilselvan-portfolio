import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { fadeUp } from './HeroAnimations';
import { Download } from 'lucide-react';

export function HeroButtons() {
  return (
    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-8">
      <Button variant="primary">Enter the Kingdom</Button>
      <Button variant="ghost">View My Work</Button>
      <Button variant="outline" icon={Download}>Download Resume</Button>
    </motion.div>
  );
}
