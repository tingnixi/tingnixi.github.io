import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const THOUGHTS = [
  {
    title: 'What Implementing Raft Taught Me About Distributed Systems',
    excerpt: 'Walking through the subtleties of leader election, log replication, and split-brain scenarios from building the Raft consensus algorithm from scratch in Go.',
    date: 'Apr 2026',
    tags: ['Systems', 'Go'],
    link: '#',
  },
  {
    title: 'Why I Stopped Using LLM APIs and Started Fine-Tuning',
    excerpt: 'An honest comparison of zero-shot prompting vs. lightweight LoRA fine-tuning for domain-specific NLP tasks — cost, accuracy, and latency tradeoffs.',
    date: 'Feb 2026',
    tags: ['ML', 'NLP'],
    link: '#',
  },
  {
    title: 'The Hidden Cost of O(n log n) — Cache Locality Matters',
    excerpt: 'Why a poorly-cache-friendly merge sort can lose to a naive bubble sort on small arrays, and what this means for algorithm analysis in practice.',
    date: 'Dec 2025',
    tags: ['Algorithms', 'Performance'],
    link: '#',
  },
];

function ThoughtCard({ thought, index }) {
  return (
    <motion.div
      className="border-b border-gray-800 py-8 md:py-12 hover:border-[#CCFF00]/30 transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">
            {thought.date}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#CCFF00] transition-colors">
            {thought.title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            {thought.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {thought.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 border border-gray-700 rounded text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a
          href={thought.link}
          className="mt-2 flex-shrink-0 text-[#CCFF00] hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ThoughtsSection() {
  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Blog
          </span>
          <h2 className="font-bold text-5xl md:text-7xl mt-4 leading-none tracking-tight text-white">
            TECHNICAL
            <br />
            <span className="text-[#CCFF00]">WRITING</span>
          </h2>
        </motion.div>

        <div className="border-t border-gray-800">
          {THOUGHTS.map((thought, index) => (
            <ThoughtCard key={thought.title} thought={thought} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
