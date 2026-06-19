import { motion } from 'framer-motion';

const SKILLS = {
  'Languages': ['Python', 'Go', 'C/C++', 'TypeScript', 'Java', 'Rust'],
  'Systems & Infra': ['Linux', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis'],
  'ML / AI': ['PyTorch', 'Transformers', 'Scikit-Learn', 'CUDA', 'NumPy', 'Pandas'],
  'Web': ['React', 'FastAPI', 'Node.js', 'GraphQL', 'REST', 'WebSockets'],
};

export default function SkillsSection() {
  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="text-xs uppercase tracking-widest text-gray-500 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Technical Stack
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {Object.entries(SKILLS).map((category, categoryIndex) => (
            <motion.div
              key={category[0]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-xs uppercase tracking-widest text-[#CCFF00] mb-6 font-bold">
                {category[0]}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category[1].map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-2 border border-gray-700 rounded text-sm text-gray-400 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
