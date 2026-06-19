import Navbar from '../components/nav/Navbar';
import HeroSection from '../components/hero/HeroSection';
import WorkSection from '../components/work/WorkSection';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/about/SkillsSection';
import ThoughtsSection from '../components/thoughts/ThoughtsSection';
import ContactFooter from '../components/contact/ContactFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <div id="work">
        <WorkSection />
      </div>
      <div id="about">
        <AboutSection />
        <SkillsSection />
      </div>
      <div id="thoughts">
        <ThoughtsSection />
      </div>
      <div id="contact">
        <ContactFooter />
      </div>
    </div>
  );
}
