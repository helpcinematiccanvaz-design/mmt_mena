/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { TECHNOLOGIES, PROCESS_STEPS, QA_CARDS, VIDEOS } from '../data';
import { PageType, TechnologyItem } from '../types';
import { Sparkles, Play, ShieldAlert, BadgeCheck, Check, Clock, Layers, Star, Video, Eye, X, Award, ShieldCheck, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import InteractiveParticlesBg from './InteractiveParticlesBg';
import MagneticButton from './MagneticButton';

interface TechnologyViewProps {
  onPageChange: (page: PageType) => void;
  onRequestQuote: () => void;
}

export default function TechnologyView({ onPageChange, onRequestQuote }: TechnologyViewProps) {
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [facilityLightboxImage, setFacilityLightboxImage] = useState<string | null>(null);

  // Facility Section scroll references and transforms
  const facilitySectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: facilityScrollY } = useScroll({
    target: facilitySectionRef,
    offset: ["start end", "end start"]
  });
  const facilityImgY = useTransform(facilityScrollY, [0, 1], [-35, 35]);
  const facilityBgY = useTransform(facilityScrollY, [0, 1], [-80, 80]);

  const facilityGallery = [
    {
      title: 'Primary Robotics Assembly Floor',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      tag: 'Continuous Drum Feed'
    },
    {
      title: 'Acrylic Chemical R&D Laboratory',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      tag: 'Delta-E Calibrations'
    },
    {
      title: 'Ultrasonic Seaming Stations',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tag: 'Sonic Fusion Welding'
    },
    {
      title: 'Logistics Packaging & Rigging Base',
      img: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      tag: 'GCC Overnight Dispatch'
    }
  ];

  return (
    <div id="technology-view-container" className="font-sans text-gray-300">

      {/* 1. HERO BANNER */}
      <section id="tech-hero" className="relative pt-44 pb-32 bg-primary overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Subtle Interactive Particles System */}
          <InteractiveParticlesBg 
            particleCount={65}
            maxDistance={120}
            speedFactor={0.35}
            color="rgba(255, 255, 255, 0.18)"
            lineColor="rgba(255, 255, 255, 0.05)"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col gap-6">
          <span className="text-xs text-accent font-mono uppercase tracking-widest bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-full w-fit mx-auto font-bold">
            Proprietary Manufacturing IP
          </span>
          <h1 className="text-white text-4xl sm:text-6xl font-serif font-light tracking-wide leading-tight">
            Technology That <span className="italic text-accent">Delivers Perfection</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From molecularly-stable acrylic polymer paints to state-of-the-art robotic paint drum cylinders, MMT engineers advanced visual systems that set international benchmarks for outdoor media.
          </p>
        </div>
      </section>

      {/* 2. ALTERNATING TECHNOLOGY DETAIL SECTIONS */}
      <section id="tech-spotlight" className="py-24 bg-secondary border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-32">
          {TECHNOLOGIES.map((tech, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={tech.id}
                id={`tech-detail-${tech.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
              >
                {/* Image Block */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="absolute -inset-1 bg-gradient-to-tr from-accent to-highlight opacity-20 rounded-2xl blur-lg" />
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-primary">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {/* Glowing highlight lens */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Text Description Block */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 flex flex-col gap-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-px bg-highlight" />
                    <span className="text-xs font-mono text-highlight uppercase tracking-widest">{tech.subtitle}</span>
                  </div>

                  <h3 className="text-white font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                    {tech.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Bullet Benefits list */}
                  <ul className="flex flex-col gap-3">
                    {tech.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-highlight flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Specs Mini-hud */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-white/5 text-left bg-primary/20 p-4 rounded-xl border border-white/5">
                    {tech.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col gap-0.5">
                        <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">{spec.label}</span>
                        <span className="text-white font-bold text-xs tracking-tight">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <section id="process-timeline-section" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Turnkey Production Framework</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Our Process <span className="italic text-accent">Timeline</span>
            </h2>
            <p className="text-gray-400 text-sm">
              How MMT moves your large-scale graphics from corporate blueprinted ideas into physical landmark installations.
            </p>
          </motion.div>

          {/* Interactive Horizontal timeline */}
          {/* Active indicator bar */}
          <div className="hidden lg:block w-full h-1.5 bg-white/5 rounded-full mb-10 relative overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-highlight transition-all duration-500 rounded-full shadow-[0_0_8px_#00C8FF]"
              style={{ width: `${((activeTimelineStep + 1) / PROCESS_STEPS.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeTimelineStep === idx;
              return (
                <motion.div
                  key={idx}
                  id={`timeline-step-card-${idx}`}
                  onClick={() => setActiveTimelineStep(idx)}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: isActive ? 1.02 : 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col gap-4 text-left cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'glass-panel border-highlight shadow-xl shadow-highlight/10 highlight-glow scale-102 z-10'
                      : 'bg-secondary/40 border-white/5 hover:border-white/15 hover:scale-101'
                  }`}
                >
                  {/* Subtle top indicator strip on active step */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-highlight animate-pulse" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-highlight' : 'text-gray-400'}`}>{`STEP ${step.step}`}</span>
                    <span className="text-[10px] font-mono text-gray-500">{step.duration}</span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm leading-snug">{step.title}</h4>
                    <p className={`text-xs mt-2 leading-relaxed transition-colors duration-300 ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>

                  {isActive && (
                    <div className="mt-2 pt-3 border-t border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1.5">Action Checklist:</p>
                      <ul className="flex flex-col gap-1 text-[10px] text-gray-400 font-sans">
                        {step.details.map((det, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-highlight" />
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FACILITY INTERACTIVE SHOWCASE GALLERY */}
      <section ref={facilitySectionRef} id="facility-section" className="py-24 bg-secondary border-t border-b border-white/5 relative overflow-hidden">
        {/* Subtle schematic blueprint background image with parallax */}
        <motion.div 
          style={{ y: facilityBgY }}
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] select-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
            alt="Technical Schematic Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">15,000 SQM MANUFACTURING INFRASTRUCTURE</span>
              <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
                Our Production <span className="italic text-accent">Facility</span>
              </h2>
            </div>
            
            <p className="text-gray-400 text-sm max-w-sm">
              Explore the advanced machinery, calibration centers, and heavy rigging bays driving high-fidelity print logistics across Dubai and Riyadh.
            </p>
          </motion.div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityGallery.map((item, idx) => (
              <motion.div
                key={idx}
                id={`facility-card-${idx}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-primary rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <motion.img
                    style={{ y: facilityImgY }}
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="absolute -top-[10%] left-0 w-full h-[120%] object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] text-highlight font-mono uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>
                  <h4 className="text-white font-bold text-sm leading-snug">{item.title}</h4>
                  
                  <button
                    id={`view-facility-img-${idx}`}
                    onClick={() => setFacilityLightboxImage(item.img)}
                    className="mt-4 text-[10px] font-mono text-white/60 group-hover:text-white uppercase tracking-wider text-left transition-colors cursor-pointer flex items-center gap-1 relative z-10"
                  >
                    <span>Inspect Photo</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. QUALITY ASSURANCE PARAMETERS */}
      <section id="qa-section" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Zero-Defect B2B Directives</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Rigorous Quality <span className="italic text-accent">Assurance</span>
            </h2>
            <p className="text-gray-400 text-sm">
              We certify every campaign against global material and climate standards to assure stakeholders of durable visual dominance.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {QA_CARDS.map((qa, idx) => (
              <motion.div
                key={qa.id}
                id={`qa-card-${qa.id}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-secondary border border-white/5 hover:border-highlight/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <span className="w-10 h-1 bg-highlight rounded-full" />
                  <h3 className="text-white font-bold text-base leading-snug">{qa.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{qa.description}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-2 bg-primary/40 p-4 rounded-xl text-left">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">Calibration Output</span>
                    <span className="text-highlight font-bold font-mono text-xs">{qa.metric}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-2">
                    <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">Test Standard</span>
                    <span className="text-white text-[10px] font-mono leading-relaxed">{qa.testMethod}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. VIDEO GALLERY */}
      <section id="video-section" className="py-24 bg-secondary border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Multimedia Operations</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Media & R&D <span className="italic text-accent font-light">Gallery</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Watch our custom engineered mechanics and time-lapse recordings of landmark installations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VIDEOS.map((vid, idx) => (
              <motion.div
                key={vid.id}
                id={`video-card-${vid.id}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-primary border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors flex items-center justify-center">
                    <button
                      id={`play-vid-btn-${vid.id}`}
                      onClick={() => setSelectedVideo(vid.id)}
                      className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-95 group-hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Play video"
                    >
                      <Play className="w-5 h-5 fill-current text-primary ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white tracking-widest">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[10px] text-highlight font-mono uppercase tracking-widest block mb-2">{vid.category}</span>
                  <h3 className="text-white font-bold text-base group-hover:text-highlight transition-colors mb-2 leading-snug">{vid.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{vid.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section id="tech-cta" className="py-24 bg-primary relative">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-6 relative z-10"
        >
          <h2 className="text-white text-3xl sm:text-5xl font-serif font-light tracking-wide leading-tight">
            Need A Specialized <span className="italic text-accent">Production Solution?</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Our specialized engineers are available for custom material fabrications, structural mesh calculations, and overnight aviation rigging setups. Let’s configure a solution.
          </p>
          <MagneticButton
            id="consultation-quote-btn"
            onClick={onRequestQuote}
            className="px-8 py-4 bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] text-slate-950 font-black rounded-full uppercase text-xs tracking-widest shadow-lg w-fit mx-auto cursor-pointer border border-white/10"
          >
            Request B2B Consultation
          </MagneticButton>
        </motion.div>
      </section>

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <div
          id="video-player-lightbox"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <div className="bg-secondary rounded-2xl border border-white/15 max-w-3xl w-full p-6 relative">
            <button
              id="close-video-btn"
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-highlight font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs uppercase tracking-widest"
            >
              <span>Close Player</span>
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
              {/* Informative placeholder representing high-end streaming video content */}
              <div className="p-8 text-center flex flex-col items-center gap-4">
                <Play className="w-12 h-12 text-highlight animate-pulse" />
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {VIDEOS.find((v) => v.id === selectedVideo)?.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-2">
                    *MMT Secure Internal B2B Video Streaming Engine loaded successfully*
                  </p>
                  <p className="text-[11px] text-highlight mt-4 max-w-md bg-highlight/5 border border-highlight/10 p-3 rounded-lg mx-auto leading-relaxed">
                    This video presentation is synchronized directly with our regional CRM system and cloud server, allowing client partners to view live footage of our automated systems, dry weatherometers, and robotics floors securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Facility Image Lightbox */}
      {facilityLightboxImage && (
        <div
          id="facility-lightbox"
          className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4 backdrop-blur"
        >
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col gap-4">
            <div className="flex items-center justify-between text-white">
              <span className="text-xs font-mono uppercase tracking-widest text-highlight">Inspect Facility Room</span>
              <button
                id="close-facility-lightbox-btn"
                onClick={() => setFacilityLightboxImage(null)}
                className="text-white hover:text-highlight flex items-center gap-1 text-xs uppercase tracking-widest cursor-pointer"
              >
                <span>Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-secondary rounded-2xl border border-white/10 overflow-hidden aspect-video">
              <img src={facilityLightboxImage} alt="Large Facility" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
