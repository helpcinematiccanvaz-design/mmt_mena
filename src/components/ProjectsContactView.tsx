/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { TESTIMONIALS, INDUSTRIES } from '../data';
import { InquiryFormData } from '../types';
import { 
  Megaphone, ShieldCheck, Building2, Sparkles, PlaneTakeoff, Hotel, Car, Wifi, Trophy, ShoppingBag, 
  MapPin, Phone, Mail, Clock, Upload, ArrowRight, CheckCircle, FileText, Star, ChevronLeft, ChevronRight, Info, AlertCircle 
} from 'lucide-react';
import ProjectGallery from './ProjectGallery';
import CampaignEstimator from './CampaignEstimator';
import { motion } from 'motion/react';
import InteractiveParticlesBg from './InteractiveParticlesBg';
import MagneticButton from './MagneticButton';

export default function ProjectsContactView() {
  // Testimonial Carousel Index State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Contact Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    company: '',
    designation: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    projectType: 'Billboard Print',
    requirement: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<InquiryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketReference, setTicketReference] = useState('');

  // Drag and drop states for artwork attachment
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle locking specs from the CampaignEstimator widget
  const handleLockSpecs = (specsText: string) => {
    setFormData((prev) => ({
      ...prev,
      requirement: specsText
    }));

    // Scroll to form inputs smoothly
    setTimeout(() => {
      const el = document.getElementById('input-requirement');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Flash indicator
        el.classList.add('ring-2', 'ring-highlight', 'transition-all');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-highlight');
        }, 1500);
      }
    }, 150);
  };

  // Testimonial controls
  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Render Industry Icon helper
  const renderIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-highlight" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-highlight" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-highlight" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-highlight" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5 text-highlight" />;
      case 'Hotel': return <Hotel className="w-5 h-5 text-highlight" />;
      case 'Car': return <Car className="w-5 h-5 text-highlight" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-highlight" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-highlight" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-highlight" />;
      default: return <Sparkles className="w-5 h-5 text-highlight" />;
    }
  };

  // Form input change handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof InquiryFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Drag over action
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Drop action
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      attachFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      attachFile(e.target.files[0]);
    }
  };

  const attachFile = (file: File) => {
    // Check file size limit (100MB)
    const sizeInMB = file.size / (1024 * 1024);
    setFormData((prev) => ({
      ...prev,
      artworkName: file.name,
      artworkSize: `${sizeInMB.toFixed(1)} MB`
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<InquiryFormData> = {};

    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.email.trim()) {
      errors.email = 'Corporate email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.requirement.trim()) errors.requirement = 'Please describe your print parameters';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error message
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`form-field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submit animation simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate a random ticket code
      const randRef = `MMT-CRM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketReference(randRef);
    }, 1500);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      company: '',
      designation: '',
      email: '',
      phone: '',
      country: 'United Arab Emirates',
      projectType: 'Billboard Print',
      requirement: ''
    });
    setFormErrors({});
    setIsSuccess(false);
  };

  return (
    <div id="portfolio-contact-view-container" className="font-sans text-gray-300">

      {/* 1. HERO BANNER */}
      <section id="portfolio-hero" className="relative pt-44 pb-32 bg-primary overflow-hidden">
        {/* Glow backdrop */}
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

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col gap-6"
        >
          <span className="text-xs text-accent font-mono uppercase tracking-widest bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-full w-fit mx-auto font-bold">
            B2B Client Showcase
          </span>
          <h1 className="text-white text-4xl sm:text-6xl font-serif font-light tracking-wide leading-tight">
            Our Work <span className="italic text-accent">Speaks For Itself</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering landmark visual takeovers across the major transport hubs, luxury facades, and highway unipoles in the Middle East. Explore our verified corporate case studies below.
          </p>
        </motion.div>
      </section>

      {/* 2. PROJECT PORTFOLIO GRID (FULL FILTERABLE) */}
      <section id="portfolio-grid-section" className="py-24 bg-secondary border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Verified Landmarks</span>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-light tracking-wide leading-none">
              Filter Case <span className="italic text-accent">Studies</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              Each campaign has undergone strict OHSAS structural rigging, CIELAB color profiling, and high-frequency sonic welding. Click to open full B2B details.
            </p>
          </motion.div>

          <ProjectGallery />

        </div>
      </section>

      {/* 3. INDUSTRIES SERVED BENTO GRID */}
      <section id="industries-section" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Multi-Sector Compliance</span>
            <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight">
              Industries <span className="italic text-accent">We Serve</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Providing specialized material tolerances and safety classifications matching prestigious sectors across GCC countries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind, idx) => (
              <motion.div
                key={idx}
                id={`industry-card-${idx}`}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 rounded-2xl bg-secondary hover:bg-white/2 border border-white/5 hover:border-highlight/30 transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[160px] hover:-translate-y-1 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-highlight/5 border border-highlight/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  {renderIndustryIcon(ind.icon)}
                </div>
                
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide leading-tight group-hover:text-highlight transition-colors">
                    {ind.name}
                  </h4>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1.5 block">
                    MMT Certified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. TESTIMONIALS CAROUSEL SLIDER */}
      <section id="testimonials-section" className="py-24 bg-secondary border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col gap-3"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Stakeholder Reviews</span>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-light tracking-wide">
              What Partners <span className="italic text-accent">Say</span>
            </h2>
          </motion.div>

          {/* Testimonial Active Slider Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-primary/50 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative"
          >
            
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
              ))}
            </div>

            {/* Quote Body text */}
            <blockquote className="text-white text-lg sm:text-xl font-medium italic leading-relaxed mb-8">
              "{TESTIMONIALS[activeTestimonial].text}"
            </blockquote>

            {/* Author details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-highlight bg-slate-800">
                <img
                  src={TESTIMONIALS[activeTestimonial].image}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-bold text-sm">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {TESTIMONIALS[activeTestimonial].role} • <span className="text-highlight">{TESTIMONIALS[activeTestimonial].company}</span>
                </p>
              </div>
            </div>

            {/* Slider Navigation arrows */}
            <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2">
              <button
                id="prev-testimonial-btn"
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
              <button
                id="next-testimonial-btn"
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimonial === idx ? 'w-6 bg-highlight' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CAMPAIGN SPECIFICATION ESTIMATOR WIDGET */}
      <section id="estimator-section" className="py-24 bg-primary relative border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto mb-12 flex flex-col gap-4 text-center"
          >
            <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Interactive Pre-Press Estimator</span>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-light tracking-wide leading-none">
              Calculate Your Print <span className="italic text-accent">Blueprints</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              MMT provides on-the-fly technical parameter calculation, wind-load DIN codes, and material weights based on regional GCC climates.
            </p>
          </motion.div>
          <CampaignEstimator onLockSpecs={handleLockSpecs} />
        </div>
      </section>

      {/* 5. CONTACT SECTION & LEAD FORM (TWO-COLUMN) */}
      <section id="contact-form-section" className="py-24 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Office Details, Map and hours */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8 text-left"
          >
            <div>
              <span className="text-xs text-accent font-mono uppercase tracking-widest font-semibold">Connect with our estimator</span>
              <h2 className="text-white font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight mt-2">
                Let’s Discuss Your Next <span className="italic text-accent">Campaign</span>
              </h2>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Submit your project specifications or artwork concepts directly to our estimating team. MMT provides technical calculations, wind load evaluations, and compliance consulting free of charge.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Dubai HQ info */}
              <div className="p-5 rounded-2xl bg-secondary/60 border border-white/5 flex gap-4">
                <MapPin className="w-6 h-6 text-highlight flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Dubai Head Office (UAE)</h4>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Al Thanyah Fifth, Dubai Marina District, Executive Towers, Floor 44
                  </p>
                  <p className="text-highlight font-mono text-xs mt-2 font-semibold">T: +971 4 456 7890</p>
                </div>
              </div>

              {/* Riyadh office info */}
              <div className="p-5 rounded-2xl bg-secondary/60 border border-white/5 flex gap-4">
                <MapPin className="w-6 h-6 text-highlight flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Riyadh Regional Office (KSA)</h4>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Olaya Towers, Olaya District, King Fahd Road, Tower B, Floor 12
                  </p>
                  <p className="text-highlight font-mono text-xs mt-2 font-semibold">T: +966 11 234 5678</p>
                </div>
              </div>

              {/* General support card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                  <Mail className="w-4 h-4 text-highlight mb-2" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Pre-Press Department</span>
                  <span className="text-white text-xs font-semibold block mt-1 font-mono truncate">artwork@mmtmena.com</span>
                </div>
                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                  <Clock className="w-4 h-4 text-highlight mb-2" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Working Hours</span>
                  <span className="text-white text-xs font-semibold block mt-1">Mon - Fri • GST 08:30 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Geographic office locator visual mockup */}
            <div className="mt-4 p-4 rounded-2xl border border-white/5 bg-secondary/20 relative aspect-video overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="text-center">
                <span className="text-gray-500 text-[9px] font-mono uppercase tracking-widest block mb-2">Live CRM Connection</span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wide">
                  ● ESTIMATING QUEUE: ONLINE
                </span>
                <p className="text-[10px] text-gray-500 mt-3 font-mono">Avg responsive wait time: 14 Minutes</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Lead generation contact form */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-secondary border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

            {/* CRM Form Headline */}
            <div className="mb-8 pb-6 border-b border-white/5">
              <h3 className="text-white font-extrabold text-xl tracking-wide">Request Proposal Specification</h3>
              <p className="text-gray-400 text-xs mt-1">
                Fill the fields below to initiate a formal corporate estimate.
              </p>
            </div>

            {/* Success screen overlay inside card if submitted */}
            {isSuccess ? (
              <div id="form-success-overlay" className="py-16 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-white font-bold text-2xl tracking-wide">Estimate Proposal Registered</h4>
                  <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your large-format print query has been recorded inside MMT’s regional CRM database successfully.
                  </p>
                </div>

                <div className="bg-primary/50 border border-white/5 rounded-xl p-4 font-mono text-xs text-left w-full max-w-md">
                  <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                    <span className="text-gray-500">Ticket Ref:</span>
                    <span className="text-highlight font-bold">{ticketReference}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                    <span className="text-gray-500">Client Partner:</span>
                    <span className="text-white font-semibold">{formData.name} ({formData.company})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                    <span className="text-gray-500">Selected Segment:</span>
                    <span className="text-white font-semibold">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Queue State:</span>
                    <span className="text-emerald-400 font-bold">Assigned to Estimating Desk</span>
                  </div>
                </div>

                <button
                  id="reset-form-btn"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all border border-white/10 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form id="lead-crm-form" onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div id="form-field-name" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Full Name *</label>
                    <input
                      id="input-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Tariq Al-Rashed"
                      className={`w-full bg-primary border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 ${
                        formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-accent'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </span>
                    )}
                  </div>

                  <div id="form-field-company" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Company Name *</label>
                    <input
                      id="input-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Emaar Properties"
                      className={`w-full bg-primary border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 ${
                        formErrors.company ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-accent'
                      }`}
                    />
                    {formErrors.company && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.company}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Designation & Corporate Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div id="form-field-designation" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Designation / Role</label>
                    <input
                      id="input-designation"
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Head of Marketing"
                      className="w-full bg-primary border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div id="form-field-email" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Corporate Email *</label>
                    <input
                      id="input-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rashed@emaar.ae"
                      className={`w-full bg-primary border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 ${
                        formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-accent'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Country served */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div id="form-field-phone" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Phone Number *</label>
                    <input
                      id="input-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +971 50 123 4567"
                      className={`w-full bg-primary border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 ${
                        formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-accent'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.phone}</span>
                      </span>
                    )}
                  </div>

                  <div id="form-field-country" className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">GCC / MENA Region</label>
                    <select
                      id="select-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-primary border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                    >
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Malta">Malta</option>
                    </select>
                  </div>
                </div>

                {/* Project Segment Dropdown */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Project Type</label>
                  <select
                    id="select-projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-primary border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                  >
                    <option value="Billboard Print">Billboard Print (Proprietary Acrylic Paint)</option>
                    <option value="Airport Passenger Takeover">Airport Takeover (Lightboxes & Fabric)</option>
                    <option value="Luxury Retail Shopfront">Luxury Retail Shopfront (Silicon Edge Fabric)</option>
                    <option value="Skyscraper Building Wrap">Skyscraper Building Wrap (Sonic Weld Mesh)</option>
                    <option value="National Day / Govt Campaign">National Day / Govt Campaign (Sustainable Fabric)</option>
                    <option value="Other Custom Fabrications">Other Specialized Technical Fabrications</option>
                  </select>
                </div>

                {/* Requirements details */}
                <div id="form-field-requirement" className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Project Requirements & Parameters *</label>
                  <textarea
                    id="input-requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleInputChange}
                    placeholder="Describe estimated dimensions, lighting conditions, timeline, and location factors..."
                    rows={4}
                    className={`w-full bg-primary border rounded-xl p-4 text-xs text-white focus:outline-none focus:ring-1 resize-none ${
                      formErrors.requirement ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-accent'
                    }`}
                  />
                  {formErrors.requirement && (
                    <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.requirement}</span>
                    </span>
                  )}
                </div>

                {/* Drag & Drop File Upload */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Attach Artwork Brief (Optional)</label>
                  <div
                    id="dropzone"
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      dragActive
                        ? 'border-highlight bg-highlight/5'
                        : 'border-white/10 bg-primary/40 hover:border-white/20 hover:bg-primary/60'
                    }`}
                  >
                    <input
                      id="artwork-file-input"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.tiff,.jpg,.ai,.psd,.zip"
                    />

                    <Upload className="w-6 h-6 text-gray-500" />
                    
                    <div>
                      <p className="text-xs text-white font-medium">
                        Drag and drop your file here, or <span className="text-highlight font-semibold">browse files</span>
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Supports PDF, TIFF, PSD, AI, or ZIP up to 100MB.
                      </p>
                    </div>
                  </div>

                  {/* Uploaded file preview tag */}
                  {formData.artworkName && (
                    <div id="file-attachment-preview" className="flex items-center justify-between p-3 rounded-lg bg-highlight/10 border border-highlight/20 mt-1">
                      <div className="flex items-center gap-2.5 text-xs">
                        <FileText className="w-4 h-4 text-highlight" />
                        <span className="text-white font-semibold truncate max-w-[200px]">{formData.artworkName}</span>
                        <span className="text-gray-500 text-[10px] font-mono">({formData.artworkSize})</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] font-mono font-bold uppercase">
                        ✓ Ready For Upload
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <MagneticButton
                  id="form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-accent to-highlight hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Validating with CRM...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Proposal Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </MagneticButton>
              </form>
            )}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
