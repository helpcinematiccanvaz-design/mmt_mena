/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageType = 'home' | 'technology' | 'projects';

export interface Project {
  id: string;
  title: string;
  category: 'billboards' | 'airports' | 'retail' | 'government' | 'events' | 'wraps';
  categoryLabel: string;
  client: string;
  location: string;
  technology: string;
  timeline: string;
  outcome: string;
  description: string;
  image: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface TechnologyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
  specs: { label: string; value: string }[];
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  details: string[];
}

export interface QACard {
  id: string;
  title: string;
  description: string;
  metric: string;
  testMethod: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
  avatarBg: string;
}

export interface CountryServed {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage coordinate for customized map display
  projectsCount: string;
  details: string;
}

export interface InquiryFormData {
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  country: string;
  projectType: string;
  requirement: string;
  artworkName?: string;
  artworkSize?: string;
}
