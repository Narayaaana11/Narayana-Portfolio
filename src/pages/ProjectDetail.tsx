import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { projectDetails } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectDetails.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm font-mono text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-black selection:bg-black selection:text-white">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 md:top-8 left-6 md:left-8 z-50"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-xs font-mono tracking-widest uppercase text-gray-700 hover:text-black hover:bg-black/10 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      </motion.div>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: project.color }}
            >
              {project.type}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mb-8">
              {project.tagline}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-mono tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: project.color }}
              >
                Visit Live Project
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {project.images[0] && (
        <section className="px-6 md:px-24 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 bg-black/[0.02]">
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="w-full h-auto"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full aspect-video flex items-center justify-center bg-black/[0.03]"><span class="font-mono text-sm text-gray-400 tracking-widest uppercase">Screenshot coming soon</span></div>`;
                  }
                }}
              />
            </div>
            <p className="text-xs font-mono text-gray-400 tracking-wide mt-3 text-center">
              {project.images[0].caption}
            </p>
          </motion.div>
        </section>
      )}

      {/* Overview: Problem + Approach */}
      <section className="px-6 md:px-24 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">The Problem</h2>
            <p className="text-lg md:text-xl text-black leading-relaxed">{project.problem}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">The Approach</h2>
            <p className="text-lg md:text-xl text-black leading-relaxed">{project.approach}</p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-24"><div className="max-w-5xl mx-auto border-t border-black/10" /></div>

      {/* Key Features */}
      <section className="px-6 md:px-24 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-12"
          >
            Key Features
          </motion.h2>
          <div className="flex flex-col gap-16 md:gap-24">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
              >
                {/* Feature image */}
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden border border-black/10 bg-black/[0.02]">
                    {feature.image ? (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-auto"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full aspect-video flex items-center justify-center bg-black/[0.03]"><span class="font-mono text-xs text-gray-400 tracking-widest uppercase">Screenshot coming soon</span></div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full aspect-video flex items-center justify-center bg-black/[0.03]">
                        <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Screenshot coming soon</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Feature text */}
                <div className="flex-1">
                  <div
                    className="w-8 h-1 rounded-full mb-4"
                    style={{ backgroundColor: project.color }}
                  />
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-24"><div className="max-w-5xl mx-auto border-t border-black/10" /></div>

      {/* Tech Stack */}
      <section className="px-6 md:px-24 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-12"
          >
            Tech Stack
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-2xl bg-black/[0.02] border border-black/10"
              >
                <h4 className="text-sm font-bold tracking-tight text-black mb-1">{tech.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{tech.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional images */}
      {project.images.length > 1 && (
        <section className="px-6 md:px-24 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <div className="rounded-2xl overflow-hidden border border-black/10 bg-black/[0.02]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full aspect-video flex items-center justify-center bg-black/[0.03]"><span class="font-mono text-xs text-gray-400 tracking-widest uppercase">Screenshot coming soon</span></div>`;
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs font-mono text-gray-400 tracking-wide mt-3 text-center">{img.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 md:px-24 py-16 md:py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">Like what you see?</h2>
            <p className="text-gray-500 text-sm font-mono tracking-wide">Check out the live project or explore more of my work.</p>
          </div>
          <div className="flex gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-mono tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: project.color }}
              >
                Live Project <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 border border-black/10 text-xs font-mono tracking-widest uppercase text-gray-700 hover:text-black hover:bg-black/10 transition-all cursor-pointer"
            >
              All Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
