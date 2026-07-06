/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { X, Calendar, MapPin, ShieldCheck, Briefcase, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectGalleryProps {
  initialCategory?: string;
  limit?: number;
}

export default function ProjectGallery({ initialCategory = 'all', limit }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'billboards', label: 'Billboards' },
    { id: 'airports', label: 'Airports' },
    { id: 'retail', label: 'Retail' },
    { id: 'government', label: 'Government' },
    { id: 'events', label: 'Events' },
    { id: 'wraps', label: 'Building Wraps' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const handleOpenLightbox = (project: Project) => {
    setSelectedProject(project);
    setActiveGalleryIdx(0);
  };

  const handleNextImage = (galleryLength: number) => {
    setActiveGalleryIdx((prev) => (prev + 1) % galleryLength);
  };

  const handlePrevImage = (galleryLength: number) => {
    setActiveGalleryIdx((prev) => (prev - 1 + galleryLength) % galleryLength);
  };

  return (
    <div id="project-gallery-component" className="w-full">
      {/* Filters Navigation Panel */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.id}
            id={`filter-btn-${f.id}`}
            onClick={() => setActiveFilter(f.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === f.id
                ? 'bg-accent text-white shadow-lg shadow-accent/20 border border-accent'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Visual Wrapper */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                
                {/* Category Floating Tag */}
                <span className="absolute top-4 left-4 bg-accent/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                  {project.categoryLabel}
                </span>

                {/* Hover Inspect Indicator */}
                <button
                  onClick={() => handleOpenLightbox(project)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/60 backdrop-blur-sm cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Eye className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Meta Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-highlight font-mono mb-2 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-highlight transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-gray-500 text-[10px] uppercase font-mono tracking-wider">Client: {project.client.split('/')[0]}</span>
                  <button
                    id={`project-details-btn-${project.id}`}
                    onClick={() => handleOpenLightbox(project)}
                    className="text-highlight hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {displayedProjects.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-gray-400">No projects found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal Box */}
      {selectedProject && (
        <div
          id="project-lightbox"
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-secondary border border-white/10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/80 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-secondary/80 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <span className="bg-highlight/10 text-highlight border border-highlight/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {selectedProject.categoryLabel}
                </span>
                <span className="text-xs text-gray-400 font-mono">B2B Case Study</span>
              </div>
              <button
                id="close-lightbox-btn"
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Media Carousel - Left */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-primary">
                  {/* Active Slide Image */}
                  <img
                    src={selectedProject.gallery[activeGalleryIdx] || selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Carousel Controls if multi-image */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(selectedProject.gallery.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleNextImage(selectedProject.gallery.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Carousel Thumbnails */}
                {selectedProject.gallery.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-2">
                    {selectedProject.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        id={`lightbox-thumb-${idx}`}
                        onClick={() => setActiveGalleryIdx(idx)}
                        className={`relative w-20 aspect-video rounded-lg overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                          activeGalleryIdx === idx
                            ? 'border-highlight ring-2 ring-highlight/20'
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <img src={imgUrl} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Case Study Details - Right */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-white font-extrabold text-2xl tracking-tight mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* B2B Specs List */}
                  <div className="grid grid-cols-1 gap-4 bg-primary/40 border border-white/5 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3 text-xs">
                      <Briefcase className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Client / Partner</p>
                        <p className="text-white font-semibold mt-0.5">{selectedProject.client}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs">
                      <MapPin className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Location</p>
                        <p className="text-white font-semibold mt-0.5">{selectedProject.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs">
                      <ShieldCheck className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Technology Employed</p>
                        <p className="text-white font-semibold mt-0.5 text-highlight">{selectedProject.technology}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs">
                      <Calendar className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Timeline</p>
                        <p className="text-white font-semibold mt-0.5">{selectedProject.timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantified Business Outcome */}
                <div className="bg-highlight/5 border border-highlight/20 rounded-xl p-4">
                  <h4 className="text-highlight font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Business Outcome</span>
                  </h4>
                  <p className="text-white font-semibold text-xs leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
