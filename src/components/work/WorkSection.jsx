import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    category: 'DATA STRUCTURES & ALGORITHMS',
    title: 'Project 0 — Two Sum',
    description: 'A classic algorithmic problem: given an array of integers and a target value, return indices of the two numbers that sum to target. Implemented with both brute-force O(n²) and hash-map O(n) approaches.',
    tags: ['Python', 'Arrays', 'Hash Map', 'Two Pointers'],
    link: '#',
  },
  {
    id: 2,
    category: 'SYSTEMS / DATABASES',
    title: 'Project B — CSV Mini Database & Query Engine',
    description: 'A lightweight in-memory SQL-like engine that loads CSV files as tables and supports SELECT, WHERE, JOIN, GROUP BY, and ORDER BY queries with a custom query parser and execution planner.',
    tags: ['C', 'Parsing', 'Query Engine', 'CSV', 'Data Structures'],
    link: '#',
  },
];

export default function WorkSection() {
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
          <span className="text-xs uppercase tracking-widest text-[#CCFF00]">
            Course Projects
          </span>
          <h2 className="font-bold text-5xl md:text-7xl mt-4 leading-none tracking-tight text-white">
            THE
            <br />
            <span className="text-[#CCFF00]">ARCHIVE</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="border border-gray-800 rounded-lg p-6 md:p-8 hover:border-[#CCFF00]/50 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-widest text-[#CCFF00] block mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#CCFF00] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 border border-gray-700 rounded text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  className="mt-2 flex-shrink-0 text-[#CCFF00] hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
