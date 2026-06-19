import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-8">
              About
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              I am a computer science student who enjoys building things that <span className="text-[#CCFF00]">actually work</span>.
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Currently studying CS at Yuan Ze University in Taoyuan, Taiwan. I enjoy writing clean code and diving into low-level systems. I'm always looking to learn something new — whether it's a new language, a database engine, or how compilers really work under the hood.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 md:mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { number: '2', label: 'Course Projects' },
            { number: '3+', label: 'Languages' },
            { number: 'YZU', label: 'University' },
            { number: 'TW', label: 'Location' },
          ].map((stat, index) => (
            <div key={index} className="border-t border-gray-800 pt-6">
              <p className="text-3xl md:text-4xl font-bold text-[#CCFF00] mb-2">
                {stat.number}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
