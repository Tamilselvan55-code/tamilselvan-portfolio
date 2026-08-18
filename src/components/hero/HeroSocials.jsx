import { motion } from 'framer-motion';
import { fadeUp } from './HeroAnimations';
import { Code2, Briefcase, Mail, Palette } from 'lucide-react';

const socials = [
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
  { icon: Palette, label: 'Behance', href: '#' },
];

export function HeroSocials() {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-6 mt-12">
      {socials.map((social, idx) => {
        const Icon = social.icon;
        return (
          <a
            key={idx}
            href={social.href}
            aria-label={social.label}
            className="text-text-secondary hover:text-gold-bright hover:scale-110 transition-all duration-300"
          >
            <Icon size={24} strokeWidth={1.5} />
          </a>
        );
      })}
    </motion.div>
  );
}
