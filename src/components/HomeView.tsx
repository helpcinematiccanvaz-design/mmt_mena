/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageType } from '../types';
import { SERVICES, COMPARISON_DATA, COUNTRIES_SERVED } from '../data';
import { Sparkles, ArrowRight, Zap, Check, Play, Award, Shield, Globe, Layers, ArrowUpRight, TrendingUp, ShoppingBag, Plane, Building, Clock, Coins, Car, Bike } from 'lucide-react';
import ProjectGallery from './ProjectGallery';
import { motion, useScroll, useTransform } from 'motion/react';
import InteractiveParticlesBg from './InteractiveParticlesBg';
import MagneticButton from './MagneticButton';
// @ts-ignore
import carRentImg from '../car_rent.jpg';

const AD_CAMPAIGNS = [
  {
    id: 'car' as const,
    brand: 'PREMIUM CAR RENTAL',
    location: 'SZR • DUBAI',
    title: 'RENT A CAR',
    subtitle: 'Drive Your Dream in Dubai',
    tagline1: 'LUXURY & SPORTS CARS',
    tagline2: 'BEST RATES GUARANTEED',
    bgDay: 'from-slate-900 via-neutral-900 to-slate-950',
    bgNight: 'from-neutral-950 via-black to-neutral-950',
    accentColor: 'text-red-500',
    glowColor: 'text-red-500 drop-shadow-[0_0_8px_#ef4444]',
    imageUrl: carRentImg,
  }
];

interface HomeViewProps {
  onPageChange: (page: PageType) => void;
  onRequestQuote: () => void;
}

export default function HomeView({ onPageChange, onRequestQuote }: HomeViewProps) {
  const { scrollY } = useScroll();
  // Transform values for subtle parallax effect
  const yBgText = useTransform(scrollY, [0, 800], [0, 240]);
  const yBgGrid = useTransform(scrollY, [0, 800], [0, 90]);
  const yGlow1 = useTransform(scrollY, [0, 800], [0, -120]);
  const yGlow2 = useTransform(scrollY, [0, 800], [0, 140]);

  // About Section scroll references and transforms
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"]
  });
  const aboutImgY = useTransform(aboutScrollY, [0, 1], [-35, 35]);
  const aboutBgY = useTransform(aboutScrollY, [0, 1], [-90, 90]);

  // Counters states for animated statistics
  const [estYear, setEstYear] = useState(1995);
  const [gccYear, setGccYear] = useState(2015);
  const [countriesCount, setCountriesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(100);
  const [yearsCount, setYearsCount] = useState(0);

  // Active Map Country State
  const [activeCountryId, setActiveCountryId] = useState('uae');

  // Simulated Day/Night visual switcher for Hero Unipole
  const [isHeroNight, setIsHeroNight] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState<'car'>('car');

  useEffect(() => {
    // Smooth fast counters ticking up
    const interval = setInterval(() => {
      setEstYear((prev) => (prev > 1987 ? prev - 1 : 1987));
      setGccYear((prev) => (prev > 2005 ? prev - 1 : 2005));
      setCountriesCount((prev) => (prev < 20 ? prev + 1 : 20));
      setProjectsCount((prev) => (prev < 1000 ? prev + 18 : 1000));
      setYearsCount((prev) => (prev < 39 ? prev + 1 : 39));
    }, 20);

    // Day/Night toggler interval for billboard demonstration
    const heroToggler = setInterval(() => {
      setIsHeroNight((n) => !n);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(heroToggler);
    };
  }, []);

  const selectedMapCountry = COUNTRIES_SERVED.find((c) => c.id === activeCountryId) || COUNTRIES_SERVED[0];
  const activeCampaign = AD_CAMPAIGNS.find((c) => c.id === selectedAdId) || AD_CAMPAIGNS[0];

  const getBacklightShadow = () => {
    if (!isHeroNight) return 'none';
    return '0 0 35px rgba(239, 68, 68, 0.45), inset 0 0 20px rgba(255, 255, 255, 0.1)';
  };

  // Helper to map dynamic string name into Lucide icons
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-highlight" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-highlight" />;
      case 'Plane': return <Plane className="w-6 h-6 text-highlight" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-highlight" />;
      case 'Building': return <Building className="w-6 h-6 text-highlight" />;
      default: return <Award className="w-6 h-6 text-highlight" />;
    }
  };

  return (
    <div id="home-view-container" className="font-sans text-gray-300">
      
      {/* 1. HERO SECTION WITH INTEGRATED DAY/NIGHT BILLBOARD INTERACTIVE DEMO */}
      <section id="hero-section" className="relative min-h-screen bg-primary flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Dubai Skyline Royal Backdrop Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40 mix-blend-lighten">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
            alt="Dubai Skyline Luxury"
            className="w-full h-full object-cover object-center filter saturate-[0.5] brightness-[0.25] contrast-[1.15]"
            referrerPolicy="no-referrer"
          />
          {/* Royal gold & dark ambient gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-transparent to-[#08080a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-transparent to-[#08080a]/90" />
        </div>

        {/* Animated Background Gradients & Drift pattern */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Giant decorative background text with parallax */}
          <motion.div 
            style={{ y: yBgText }}
            className="absolute -top-10 -left-20 text-[22vw] font-black text-white/[0.012] select-none pointer-events-none tracking-tighter leading-none font-sans"
          >
            MMT
          </motion.div>
          <motion.div 
            style={{ y: yBgText }}
            className="absolute bottom-10 right-4 text-[9vw] font-bold text-highlight/[0.012] select-none pointer-events-none tracking-widest font-mono uppercase"
          >
            GCC & MENA
          </motion.div>

          <motion.div 
            style={{ y: yGlow1 }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] animate-pulse-slow" 
          />
          <motion.div 
            style={{ y: yGlow2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px] animate-pulse" 
          />
          
          {/* High-tech drifting grid pattern with subtle parallax */}
          <motion.div 
            style={{ y: yBgGrid }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] animate-grid-drift" 
          />
          
          {/* Subtle Interactive Particles System */}
          <InteractiveParticlesBg 
            particleCount={80}
            maxDistance={120}
            speedFactor={0.4}
            color="rgba(255, 255, 255, 0.15)"
            lineColor="rgba(255, 255, 255, 0.03)"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 w-fit backdrop-blur-md hover:border-accent/40 transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#d4af37]" />
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase flex items-center gap-1.5 font-bold">
                <span>The Pinnacle of Large Format Craftsmanship</span>
                <Sparkles className="w-3 h-3 text-accent animate-spin" style={{ animationDuration: '8s' }} />
              </span>
            </div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18,
                    delayChildren: 0.1,
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="text-white text-4xl sm:text-6xl lg:text-7xl font-serif tracking-normal leading-tight font-medium"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="inline-block italic text-highlight"
              >
                Dream.
              </motion.span>
              <br />
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-highlight to-white text-glow font-serif font-light"
              >
                Design.
              </motion.span>
              <br />
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="inline-block font-serif italic text-accent"
              >
                Deliver.
              </motion.span>
            </motion.h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl font-light">
              Architecting luxury visual experiences, grand scale outdoor media, and high-fidelity printing solutions for GCC & MENA since {estYear}.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <MagneticButton
                id="hero-quote-btn"
                onClick={onRequestQuote}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-slate-950 font-black text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer border border-white/10"
              >
                Request an Invitation
              </MagneticButton>
              <MagneticButton
                id="hero-tech-btn"
                onClick={() => {
                  onPageChange('technology');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-widest uppercase border border-white/10 hover:border-accent/40 hover:text-accent transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur"
              >
                <span>Explore Technical Facility</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5 font-mono text-[10px] tracking-wider text-gray-400">
              <div className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all">
                <span className="text-white font-bold text-base block font-sans">EST. 1987</span>
                <span>Over 35+ Years Service</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all">
                <span className="text-white font-bold text-base block font-sans">GCC SINCE 2005</span>
                <span>Localized Expertise</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all">
                <span className="text-white font-bold text-base block font-sans">15K SQM FACILITY</span>
                <span>State-of-the-Art Plant</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all">
                <span className="text-white font-bold text-base block font-sans">7 REGIONS</span>
                <span>High-Speed Logistics</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual: Immersive interactive billboard with Day/Night toggling preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-4 relative"
          >
            
            {/* Drifting Telemetry stats to create a rich 3D UI feel */}
            <div className="absolute -top-12 -left-8 bg-secondary/90 border border-white/10 rounded-lg p-2 text-[9px] font-mono text-gray-400 tracking-wider z-20 backdrop-blur shadow-xl animate-float-slow hidden md:block">
              <span className="text-highlight font-bold">✓ DELTA-E:</span> 0.28 (CALIBRATED)
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-secondary/90 border border-white/10 rounded-lg p-2.5 text-[9px] font-mono text-gray-400 tracking-wider z-20 backdrop-blur shadow-xl animate-float-slow hidden md:block" style={{ animationDelay: '3s' }}>
              <span className="text-highlight font-bold">✓ WIND RESISTANCE:</span> DIN 1055 (160km/h)
            </div>

            {/* Interactive Control Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 rounded-t-2xl bg-white/5 border border-white/10 border-b-0 backdrop-blur-md shadow-lg">
              <div className="flex flex-col gap-0.5 text-left">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isHeroNight ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'}`} />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/90">
                    SZR Unipole: {isHeroNight ? 'Backlit ON (Night Mode)' : 'Backlit OFF (Day Mode)'}
                  </span>
                </div>
                {/* Active Campaign Info */}
                <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Campaign:</span>
                  <span className="text-red-400 font-bold">{activeCampaign.title}</span>
                </div>
              </div>
              
              {/* Selectors Panel */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Premium Day / Night Switcher */}
                <div className="flex bg-black/50 p-1 rounded-full border border-white/10 relative shadow-inner">
                  <button
                    onClick={() => setIsHeroNight(false)}
                    className={`px-3.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      !isHeroNight 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-black scale-105' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ☀ Day
                  </button>
                  <button
                    onClick={() => setIsHeroNight(true)}
                    className={`px-3.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isHeroNight 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md font-black scale-105' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ☾ Night
                  </button>
                </div>
              </div>
            </div>

            {/* Main Visual Display Card with sweep laser and spotlight effects */}
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-b-2xl overflow-hidden border border-white/10 group shadow-2xl bg-slate-950 highlight-glow transition-all duration-500 hover:border-red-500/40 animate-border-draw">
              
              {/* Laser calibration scanline sweep */}
              <div 
                className="absolute left-0 right-0 h-0.5 z-10 opacity-70 animate-laser-sweep pointer-events-none"
                style={{
                  boxShadow: '0 0 10px #ef4444',
                  backgroundImage: 'linear-gradient(to right, transparent, #ef4444, transparent)',
                }}
              />

              {/* Dynamic Unipole Image (Dubai Background skyline) */}
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Unipole Demonstration"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-102 ${
                  isHeroNight ? 'brightness-[0.22] saturate-120 contrast-125' : 'brightness-[0.85] saturate-100'
                }`}
              />

              {/* Physical Unipole Structural Leg (stands in front of backdrop, behind display box) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[32%] bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-800 border-x border-white/10 z-10 shadow-lg pointer-events-none rounded-b-md" />

              {/* Architectural Backlit Signage Ambient Halo Glow (Triggers during Night mode) */}
              <div 
                className="absolute top-[16%] left-[8%] right-[8%] bottom-[28%] rounded-xl z-15 pointer-events-none transition-all duration-700 blur-2xl"
                style={{
                  backgroundColor: !isHeroNight ? 'transparent' : '#ef4444',
                  opacity: isHeroNight ? 0.35 : 0,
                }}
              />

              {/* Interactive Physical Light Board Chassis (The Billboard Box) */}
              <div 
                className={`absolute top-[16%] left-[8%] right-[8%] bottom-[28%] bg-neutral-900 border-[4px] rounded-xl overflow-hidden z-20 flex flex-col justify-between transition-all duration-700 shadow-2xl select-none ${
                  isHeroNight ? 'border-neutral-700' : 'border-neutral-900'
                }`}
                style={{
                  boxShadow: getBacklightShadow(),
                  filter: isHeroNight ? 'brightness(1.08) contrast(1.05)' : 'none'
                }}
              >
                
                {/* Active Ad Screen Face */}
                <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 transition-all duration-700">
                  
                  {/* Backlit LED Micro Grid Pattern (Visible only in Night mode) */}
                  <div className={`absolute inset-0 bg-[radial-gradient(#ffffff0a_1.2px,transparent_1.2px)] bg-[size:5px_5px] mix-blend-overlay transition-opacity duration-700 pointer-events-none ${
                    isHeroNight ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Backdrop colors/gradients for the dynamic Ad */}
                  <div className={`absolute inset-0 transition-all duration-700 pointer-events-none z-0 bg-gradient-to-br ${
                    isHeroNight ? activeCampaign.bgNight : activeCampaign.bgDay
                  }`} />

                  {/* Real Campaign Image Background - ALWAYS HIGHLY VIVID AND BRIGHT */}
                  <img
                    src={activeCampaign.imageUrl}
                    alt={activeCampaign.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none z-0 opacity-100 brightness-110 saturate-[1.1]"
                  />

                  {/* Day Sunlight Glare Reflection overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-700 pointer-events-none z-10 ${
                    isHeroNight ? 'opacity-0' : 'opacity-100'
                  }`} />

                  {/* Inner Backlit self-illumination radial light source */}
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35)_0%,transparent_75%)] transition-opacity duration-700 pointer-events-none ${
                    isHeroNight ? 'opacity-100' : 'opacity-0'
                  }`} />

                </div>

              </div>

              {/* Glowing overlay simulating backlit registration at night */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-accent/20 via-highlight/10 to-transparent mix-blend-color-dodge transition-opacity duration-1000 pointer-events-none ${
                  isHeroNight ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Glowing spotlights from bottom simulating physical unipole illumination */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-highlight/20 via-transparent to-transparent transition-opacity duration-1000 pointer-events-none ${
                  isHeroNight ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Floating micro spec badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-primary/95 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white shadow-xl z-30 animate-border-draw">
                <div>
                  <p className="font-bold tracking-wide flex items-center gap-1.5 text-highlight">
                    <Zap className="w-3.5 h-3.5 text-highlight animate-pulse" />
                    <span>Dubai Unipole (14m × 4m Format)</span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Sheikh Zayed Road Light Board • Double-Sided Backlit System</p>
                </div>
                <div className="text-highlight font-mono font-bold uppercase text-[10px] bg-highlight/10 px-2 py-1 rounded border border-highlight/20 whitespace-nowrap">
                  {isHeroNight ? 'Backlit ON' : 'Backlit OFF'}
                </div>
              </div>
            </div>

            {/* Caption guide */}
            <p className="text-center text-xs text-gray-500 italic mt-1 flex items-center justify-center gap-1.5">
              <span>*Watch the billboard above dynamically transition from Day to Night, maintaining flawless color density.*</span>
            </p>
          </motion.div>

        </div>
      </section>

      {/* 2. ABOUT MMT */}
      <section ref={aboutSectionRef} id="about-section" className="py-24 bg-secondary relative overflow-hidden">
        {/* Subtle high-tech blueprint background image with parallax */}
        <motion.div 
          style={{ y: aboutBgY }}
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] select-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
            alt="Engineering Blueprint Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column: Heavy high-end warehouse rendering */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-accent to-highlight rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
              <motion.img
                style={{ y: aboutImgY }}
                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
                alt="MMT Production Floor"
                referrerPolicy="no-referrer"
                className="absolute -top-[10%] left-0 w-full h-[120%] object-cover transition-all duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 pointer-events-none">
                <span className="text-xs text-highlight font-mono tracking-widest uppercase block mb-1">State-of-the-Art plant</span>
                <h4 className="text-white font-bold text-lg">15,000 sqm Industrial Facility</h4>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative content & statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest font-semibold">
              <Award className="w-4 h-4 text-accent" />
              <span>Imperial Heritage Since 1987</span>
            </div>

            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Scale without bounds.<br /><span className="italic text-accent font-light">Quality without compromises.</span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed">
              Established in 1987, Metromedia Technologies (MMT) MENA has served as the backbone for the region’s most prestigious visual communications campaigns. We specialize in printing operations that demand massive scale, long-term durability, and perfect brand fidelity under extreme environmental climates.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              With deep-rooted manufacturing excellence starting in the United Arab Emirates since 2005, we support advertisers, government institutions, real estate developers, and global luxury giants across 20+ countries.
            </p>

            {/* Interactive ticking counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-8 border-t border-white/5 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-white font-extrabold text-3xl sm:text-4xl block tracking-tight font-sans text-highlight">{yearsCount}+</span>
                <span className="text-gray-400 text-xs font-mono tracking-wide uppercase">Years of Craft</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-extrabold text-3xl sm:text-4xl block tracking-tight font-sans text-highlight">{gccYear}</span>
                <span className="text-gray-400 text-xs font-mono tracking-wide uppercase">GCC Footprint</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-extrabold text-3xl sm:text-4xl block tracking-tight font-sans text-highlight">{countriesCount}+</span>
                <span className="text-gray-400 text-xs font-mono tracking-wide uppercase">Countries</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-extrabold text-3xl sm:text-4xl block tracking-tight font-sans text-highlight">{projectsCount}+</span>
                <span className="text-gray-400 text-xs font-mono tracking-wide uppercase">Projects</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. WHY INDUSTRY LEADERS CHOOSE MMT */}
      <section id="why-choose-mmt" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Prestige Specifications & Longevity</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Why Industry Leaders <span className="italic text-accent font-light">Choose MMT</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              We engineer our own technology matrices specifically designed to survive desert climates while yielding unmatched aesthetic prestige.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Acrylic Paint Technology',
                desc: 'Say goodbye to fading. Our patented water-based acrylic formulation bonds deeply into flexible vinyl, delivering a 10-year UV color guarantee.',
                metric: '10-Year UV Guarantee'
              },
              {
                title: 'Double-Sided Backlit Printing',
                desc: 'Perfect print registration on the front and back of backlit substrates ensures gorgeous night-to-day visual consistency without washed-out colors.',
                metric: '0.1mm Front-to-Back Sync'
              },
              {
                title: 'Seamless Printing & Welding',
                desc: 'Mega-scale printing capability spanning up to 5.2m seamless width, unified via ultrasonic heat bonding to secure skyscrapers without visual joinery lines.',
                metric: 'Up to 5.2m Seamless'
              },
              {
                title: 'Robotic Paint Drum Technology',
                desc: 'A custom, computerized rotating media cylinder ensuring ultra-even paint layering, perfect geometry, and extreme wind load durability.',
                metric: '±10 Micron Tolerances'
              },
              {
                title: 'Consistent Production Quality',
                desc: 'Continuous spectrodensitometer scans and rigorous 100% backlit inspections across our 25m lighting tables prevent any pixel or pinhole defects.',
                metric: 'ISO 9001 Audited'
              },
              {
                title: 'Premium Structural Materials',
                desc: 'From wind-perforated structural mesh to high-tension polyester backings, every substrate complies strictly with fire and structural codes.',
                metric: 'DIN Wind-load Verified'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                id={`why-card-${idx}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border border-white/5 hover:border-highlight/40 hover:-translate-y-2 shadow-lg"
              >
                {/* Visual Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-highlight/5 rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-highlight flex items-center justify-center font-bold font-mono text-xs mb-6 group-hover:bg-highlight/20 group-hover:border-highlight/40 group-hover:scale-110 transition-all duration-300">
                    {`0${idx + 1}`}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-highlight transition-colors flex items-center gap-2">
                    <span>{card.title}</span>
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">{card.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-500 uppercase tracking-wider">Calibrated Spec:</span>
                  <span className="text-highlight font-semibold bg-highlight/5 px-2 py-0.5 rounded border border-highlight/10">{card.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SERVICES SPOTLIGHT */}
      <section id="services-section" className="py-24 bg-secondary border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="flex flex-col gap-4 text-left max-w-2xl">
              <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Masterpieces of Engineering</span>
              <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
                Our Large-Format <span className="italic text-accent font-light">Capabilities</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Premium media production designed for industry, transport, commerce, and major city networks.
              </p>
            </div>
            
             <MagneticButton
              id="services-contact-trigger"
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto border border-white/10"
            >
              <span>Discuss Campaign Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv, idx) => (
              <motion.div
                key={serv.id}
                id={`service-card-${serv.id}`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary/40 border border-white/5 hover:border-white/15 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between hover:scale-101"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-highlight/5 border border-highlight/10 flex items-center justify-center mb-6">
                    {renderServiceIcon(serv.iconName)}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{serv.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{serv.description}</p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <ul className="flex flex-col gap-2.5 text-[11px] text-gray-400">
                    {serv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-highlight flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TECHNOLOGY COMPARISON TABLE */}
      <section id="comparison-section" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">B2B Performance Standards</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Technology <span className="italic text-accent font-light">Benchmarks</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Comparing MMT proprietary systems against standard international outdoor printing setups.
            </p>
          </motion.div>

          {/* Desktop Responsive Table */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-x-auto border border-white/5 rounded-2xl bg-secondary/40 backdrop-blur"
          >
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/10 bg-secondary/80 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                  <th className="py-5 px-6 font-semibold">Key Parameters</th>
                  <th className="py-5 px-6 font-semibold">Traditional Printing Standard</th>
                  <th className="py-5 px-6 font-semibold text-highlight">MMT Large-Format Matrix</th>
                  <th className="py-5 px-6 text-center font-semibold">Vibe Check</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {COMPARISON_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/2 transition-colors">
                    <td className="py-4 px-6 text-white font-semibold">{item.feature}</td>
                    <td className="py-4 px-6 text-gray-400">{item.traditional}</td>
                    <td className="py-4 px-6 text-white font-medium bg-highlight/2">{item.mmt}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-highlight/10 text-highlight text-[10px] font-bold font-mono uppercase tracking-wider">
                        <Zap className="w-3 h-3" />
                        <span>MMT Lead</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="text-xs text-gray-500 font-mono mt-4 text-center">
            *Source: Internally audited tests comparing Delta-E variations, wind load resistances, and longevity under simulated GCC weather chambers.
          </p>

        </div>
      </section>

      {/* 6. FEATURED PROJECTS PORTFOLIO LIGHTBOX */}
      <section id="portfolio-section" className="py-24 bg-secondary border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Exquisite Case Studies Gallery</span>
              <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-none">
                Featured <span className="italic text-accent font-light">Landmarks</span>
              </h2>
            </div>

            <button
              id="view-all-projects-btn"
              onClick={() => {
                onPageChange('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-highlight hover:text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer hover:translate-x-1 group"
            >
              <span>View Full Case Study Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Filterable Showcase Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectGallery limit={3} />
          </motion.div>

        </div>
      </section>

      {/* 7. REGIONS SERVED (INTERACTIVE MAP) */}
      <section id="regions-section" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Map Left Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest font-semibold">
              <Globe className="w-4 h-4 text-accent" />
              <span>GCC & North Africa Prestige Reach</span>
            </div>

            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Regions <span className="italic text-accent font-light">Served</span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed">
              MMT maintains dynamic logistics routes and dedicated safety-rigging operations across the major economic epicenters of the Arab world. Click on a country dot on the dashboard to inspect project scale and operational focus.
            </p>

            {/* Country buttons triggers */}
            <div className="flex flex-wrap gap-2.5 mt-4">
              {COUNTRIES_SERVED.map((country) => (
                <button
                  key={country.id}
                  id={`map-country-trigger-${country.id}`}
                  onClick={() => setActiveCountryId(country.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    activeCountryId === country.id
                      ? 'bg-accent/20 text-white border border-accent'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {country.name}
                </button>
              ))}
            </div>

            {/* Active Details Card */}
            <div className="mt-6 p-6 rounded-2xl bg-secondary/80 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-highlight/5 rounded-full blur-xl" />
              
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold text-lg">{selectedMapCountry.name}</h4>
                <span className="px-3 py-1 rounded bg-highlight/10 text-highlight text-xs font-mono font-bold uppercase">
                  {selectedMapCountry.projectsCount}
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedMapCountry.details}</p>
            </div>
          </motion.div>

          {/* Map Right: Interactive Geometric Vector representation */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-secondary/40 border border-white/10 rounded-3xl p-6 md:p-8 relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden"
          >
            
            {/* Ambient glows behind map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

            {/* Map title block */}
            <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] tracking-widest text-gray-500 uppercase">
              <span>MMT Operational Map v3.2</span>
            </div>

            {/* Simulated Vector Grid with Pins */}
            <div className="relative w-full aspect-[4/3] bg-primary/40 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
              
              {/* Graphic grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Minimalist vector continents background representation */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 font-mono text-[100px] select-none font-bold text-white tracking-widest pointer-events-none">
                MENA
              </div>

              {/* Connective schematic lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                {COUNTRIES_SERVED.map((c, i) => {
                  if (i === 0) return null;
                  const prev = COUNTRIES_SERVED[i - 1];
                  return (
                    <line
                      key={i}
                      x1={`${prev.coordinates.x}%`}
                      y1={`${prev.coordinates.y}%`}
                      x2={`${c.coordinates.x}%`}
                      y2={`${c.coordinates.y}%`}
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                    />
                  );
                })}
              </svg>

              {/* Country Pins */}
              {COUNTRIES_SERVED.map((country) => {
                const isActive = activeCountryId === country.id;
                return (
                  <button
                    key={country.id}
                    id={`map-pin-${country.id}`}
                    onClick={() => setActiveCountryId(country.id)}
                    style={{
                      left: `${country.coordinates.x}%`,
                      top: `${country.coordinates.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer focus:outline-none"
                  >
                    {/* Ring Pulse */}
                    {isActive && (
                      <span className="absolute -inset-4 rounded-full bg-highlight/30 animate-ping" />
                    )}
                    
                    {/* Circle Node */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-highlight border-white scale-125 shadow-lg shadow-highlight/50'
                        : 'bg-primary border-highlight/40 hover:border-white hover:scale-110'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Miniature tooltip text label */}
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-primary/95 border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                      {country.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom guide */}
            <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono">
              <span>Interactive HUD Controller • Touch Nodes</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section id="cta-section" className="relative py-32 bg-primary overflow-hidden">
        {/* Dynamic Dark Backdrop overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
            alt="Tower skyscraper overlay"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col gap-8"
        >
          <h2 className="text-white text-4xl sm:text-6xl font-serif font-light tracking-wide leading-tight">
            Ready To Create Your Next <span className="italic text-accent font-light">Landmark Campaign?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Partner with MMT MENA to secure industry-leading durability, perfect brand alignment, and massive aesthetic appeal. Let’s configure your corporate print requirements.
          </p>

           <div className="flex flex-wrap justify-center gap-4 mt-4">
            <MagneticButton
              id="cta-quote-btn"
              onClick={onRequestQuote}
              className="px-8 py-4 bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] text-slate-950 font-black rounded-full uppercase text-xs tracking-widest shadow-lg cursor-pointer border border-white/10"
            >
              Request an Invitation
            </MagneticButton>
            <MagneticButton
              id="cta-sales-btn"
              onClick={() => {
                onPageChange('projects');
                setTimeout(() => {
                  const element = document.getElementById('contact-form-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              Contact Sales
            </MagneticButton>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
