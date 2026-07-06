/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import HomeView from './components/HomeView';
import TechnologyView from './components/TechnologyView';
import ProjectsContactView from './components/ProjectsContactView';
import PageProgressBar from './components/PageProgressBar';
import { PageType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Handle high-priority global quote action triggers
  const handleRequestQuote = () => {
    setCurrentPage('projects');
    setTimeout(() => {
      const element = document.getElementById('contact-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-primary text-gray-100 flex flex-col font-sans antialiased selection:bg-highlight selection:text-primary">
      {/* Premium top loading progress bar for transitions */}
      <PageProgressBar currentPage={currentPage} />

      {/* Dynamic Navigation Header */}
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRequestQuote={handleRequestQuote}
      />

      {/* Main Pages Content with dynamic transition filters */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-500">
            <HomeView onPageChange={handlePageChange} onRequestQuote={handleRequestQuote} />
          </div>
        )}

        {currentPage === 'technology' && (
          <div className="animate-in fade-in duration-500">
            <TechnologyView onPageChange={handlePageChange} onRequestQuote={handleRequestQuote} />
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="animate-in fade-in duration-500">
            <ProjectsContactView />
          </div>
        )}
      </main>

      {/* Corporate Info Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Conversion Floating Elements */}
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
