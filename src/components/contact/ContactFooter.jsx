import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ContactFooter() {
  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-widest text-gray-500 block mb-6">
            Direct Protocol
          </span>
          <h2 className="font-bold text-5xl md:text-7xl text-white leading-tight">
            LET'S
            <br />
            <span className="text-[#CCFF00]">TALK</span>
            <span className="inline-block ml-4">
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 text-[#CCFF00]" />
            </span>
          </h2>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 py-12 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Email</span>
            <a
              href="mailto:s1121533@mail.yzu.edu.tw"
              className="text-lg text-white hover:text-[#CCFF00] transition-colors break-all"
            >
              s1121533@mail.yzu.edu.tw
            </a>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Location</span>
            <p className="text-lg text-white">Taoyuan, Taiwan</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Status</span>
            <p className="text-lg text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#CCFF00] rounded-full"></span>
              Available - 01:56 PM Local
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-12 border-t border-gray-800 flex justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © 2026 Tim Wu. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#CCFF00] transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#CCFF00] transition-colors">
              GitHub
            </a>
            <a href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#CCFF00] transition-colors">
              LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
