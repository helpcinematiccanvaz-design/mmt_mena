/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service, TechnologyItem, TimelineStep, QACard, Testimonial, CountryServed } from './types';

// Services Offered
export const SERVICES: Service[] = [
  {
    id: 'outdoor-advertising',
    title: 'Outdoor Advertising',
    description: 'Ultra-durable, massive-scale billboard and unipole prints designed to withstand the harsh GCC climate while maintaining perfect color vibrance.',
    iconName: 'TrendingUp',
    features: ['Robotic acrylic paint application', '10-year fade-resistance warranty', 'Seamless mesh structures', 'High wind-load engineered materials']
  },
  {
    id: 'retail-branding',
    title: 'Retail Branding',
    description: 'Precision luxury branding for high-end fashion boutiques, malls, and store fronts, utilizing high-definition textile and film prints.',
    iconName: 'ShoppingBag',
    features: ['Eco-friendly dye sublimation', 'Silicone edge graphics (SEG)', 'Optically clear window films', 'Custom acrylic fabrications']
  },
  {
    id: 'airport-branding',
    title: 'Airport Branding',
    description: 'Immersive terminal solutions, high-impact lightboxes, and pillars across major aviation hubs, delivering pixel-perfect visual fidelity.',
    iconName: 'Plane',
    features: ['Ultra-fine resolution prints', 'Seamless backlit textile panels', 'Strict airport-grade fire-retardant certification', 'Overnight precision installation teams']
  },
  {
    id: 'mall-branding',
    title: 'Mall Branding',
    description: 'Large-scale atrium banners, elevator wraps, and digital-print integrations in the most prestigious retail complexes in the GCC.',
    iconName: 'Sparkles',
    features: ['Double-sided tension banners', 'Temporary non-residue adhesives', 'Over-head structural rigging compliance', 'Interactive physical integrations']
  },
  {
    id: 'building-wraps',
    title: 'Building Wraps',
    description: 'Transform architectural structures into gigantic advertising landmarks using micro-perforated premium wind-permeable mesh fabrics.',
    iconName: 'Building',
    features: ['Mega-scale panel welding', 'Highly breathable mesh technology', 'Professional municipal permit compliance', 'Rigorous safety rigging audits']
  },
  {
    id: 'event-branding',
    title: 'Event & Government Branding',
    description: 'Turnkey graphic solutions for prestigious global summits, royal events, international sports matches, and national day campaigns.',
    iconName: 'Award',
    features: ['High-speed emergency turnarounds', 'Custom exhibition displays', 'VIP-tier textile backdrops', 'Sustainable reusable materials']
  }
];

// Technologies Spotlight
export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'acrylic-paint-tech',
    title: 'Acrylic Paint Technology',
    subtitle: 'Proprietary Outdoor Durability System',
    description: 'Unlike standard digital solvent inks that degrade rapidly under intense GCC UV light, our proprietary Acrylic Paint Printing technology molecularly bonds deep-pigmented acrylic paints to flexible substrates. This delivers unmatched brilliance that remains fade-proof for over a decade.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      '10-Year fade resistance in 50°C+ desert environments',
      'Elastomeric flexibility prevents cracking or peeling',
      'Zero volatile organic compounds (VOCs) after curing',
      'Highly resistant to desert sandstorms and chemical cleaning'
    ],
    specs: [
      { label: 'Pigment Grade', value: 'Automotive-Tier Pure Acrylic' },
      { label: 'UV Resistance Rating', value: 'ASTM G154 Category 1 (10,000 hrs)' },
      { label: 'Substrate Lifespan', value: '10+ Years Unmatched' }
    ]
  },
  {
    id: 'robotic-drum-tech',
    title: 'Robotic Paint Drum Technology',
    subtitle: 'Massive Scale Precision Engineering',
    description: 'Engineered in-house, our custom Robotic Paint Drum printers utilize a gigantic rotating cylinder coupled with computer-controlled multi-axis robotic airbrush systems. This creates flawless, continuous, high-speed paint applications across single-sheet rolls up to 5 meters wide.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Flawless geometric reproduction at mega sizes',
      'Micro-stepped precision calibrated to 0.01mm increments',
      'Continuous uninterrupted drum feed boosts curing efficiency',
      'Automated nozzle alignment and continuous flow sensors'
    ],
    specs: [
      { label: 'Drum Width capacity', value: '5.2 Meters Seamless' },
      { label: 'Positioning Precision', value: '± 10 Microns' },
      { label: 'Application Speed', value: 'Up to 350 m²/hour' }
    ]
  },
  {
    id: 'double-sided-printing',
    title: 'Double-Sided Backlit Printing',
    subtitle: 'Day-to-Night Visual Mastery',
    description: 'To solve the problem of washed-out colors on billboards when illuminated by backlights at night, MMT developed double-sided registration printing. We print on both the front and reverse side of the substrate in perfect pixel alignment, ensuring colors stay deep, dramatic, and high-contrast in any lighting state.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Identical color density under direct daylight and backlight',
      'Automated dual-side camera registration tracks stretch',
      'Eliminates ghosting or blurred shadows at the edges',
      'Ideal for prestige airport lightboxes and landmark unipoles'
    ],
    specs: [
      { label: 'Registration Tolerance', value: 'Less than 0.5mm across 50m' },
      { label: 'Backlit Transmittance', value: 'Optimized 35% Diffusion' },
      { label: 'Ink Overlay Density', value: 'Dual-side synchronized 200%' }
    ]
  },
  {
    id: 'seamless-welding',
    title: 'Seamless Sonic Welding',
    subtitle: 'Invisible Joinery at Unlimited Scale',
    description: 'For advertisements larger than 5 meters—such as building wraps on skyscrapers—multiple rolls must be joined together. We utilize advanced high-frequency electromagnetic sonic welding which bonds vinyl panels together at the molecular level, creating joints that are structurally stronger than the fabric itself, and completely invisible to the eye.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Withstands hurricane-force wind loads up to 160 km/h',
      'Waterproof, airtight, and UV-stabilized seam lines',
      'Absolutely no thread stitching or chemical adhesive yellowing',
      'Perfect image alignment across joint interfaces'
    ],
    specs: [
      { label: 'Weld Seam Strength', value: '98% of Base Substrate Tensile' },
      { label: 'Seam Width', value: 'Minimalist 12mm flat-profile' },
      { label: 'Compliance Standard', value: 'DIN EN ISO 13934-1' }
    ]
  }
];

// Process Timeline Steps
export const PROCESS_STEPS: TimelineStep[] = [
  {
    step: '01',
    title: 'B2B Consultation',
    description: 'Our engineering and media design teams analyze your structural plans, location parameters, wind load requirements, and lighting configurations.',
    duration: '1-2 Days',
    details: ['Structural site evaluation', 'Substrate & technology selection', 'Local municipal permit consultation']
  },
  {
    step: '02',
    title: 'Artwork Prep & Pre-flight',
    description: 'High-performance pre-press processing and color profiles are tailored to the designated substrate, utilizing specialized ICC profiling.',
    duration: '1 Day',
    details: ['Gigapixel rasterization checks', 'Pantone & brand color calibration', 'Double-sided registration indexing']
  },
  {
    step: '03',
    title: 'Robotic Calibration',
    description: 'Printers are loaded with high-pigment acrylic paints. Laser-calibrated heads match environmental humidity and temperature factors.',
    duration: 'Half Day',
    details: ['Nozzle alignment scan', 'Drying tunnel temperature check', 'Dual-sided tracking camera bootup']
  },
  {
    step: '04',
    title: 'High-Speed Production',
    description: 'State-of-the-art robotic airbrushes or dye sublimation presses print your campaign at blazing speeds without compromising fidelity.',
    duration: '2-4 Days',
    details: ['Continuous web feed monitoring', 'In-line color densitometer scanning', 'Automatic rotational drum speed control']
  },
  {
    step: '05',
    title: 'Quality Inspection & Seams',
    description: 'Panels undergo 100% backlit quality inspection and are fused via high-frequency sonic welding for ultimate structural strength.',
    duration: '1 Day',
    details: ['Light-table backlighting analysis', 'Tensile strength seam welding', 'Grommet & wind-vent fabrication']
  },
  {
    step: '06',
    title: 'Dispatch & Safety Rigging',
    description: 'MMT-certified professional industrial riggers securely transport and install the visual landmarks across the designated GCC/MENA site.',
    duration: '1-2 Days',
    details: ['Logistics tracking with high-care packaging', 'Overnight precision rigging with safety signs', 'Final client handover and photo sign-off']
  }
];

// Quality Assurance Parameters
export const QA_CARDS: QACard[] = [
  {
    id: 'material-testing',
    title: 'Material Tensile Testing',
    description: 'Substrates undergo extreme tension pulls to ensure they survive high-altitude wind currents without tearing or stretching out of shape.',
    metric: 'Up to 2400 N / 5cm',
    testMethod: 'ASTM D5034 Grab Test Standard'
  },
  {
    id: 'color-testing',
    title: 'Spectrophotometer Color Sync',
    description: 'Every print batch is measured against initial digital vector brand books to verify Delta-E variation remains completely imperceptible.',
    metric: 'Delta-E < 0.8 Tolerance',
    testMethod: 'CIELAB Color Space Calibration'
  },
  {
    id: 'weather-testing',
    title: 'Weather Chamber Aging',
    description: 'We accelerate thermal shock, extreme humidity, and high ultraviolet exposures inside certified QUV weatherometers to guarantee longevity.',
    metric: '10,000 Hours Accelerated',
    testMethod: 'ISO 4892 Xenon Arc Exposure'
  },
  {
    id: 'inspection',
    title: '100% Backlit Light Table Audit',
    description: 'To prevent microscopic print gaps and pinholes from shining through at night, every single backlit project is laid flat on a 25m lighting table.',
    metric: 'Zero Pinhole Defect Policy',
    testMethod: 'Continuous Backlit Visual Inspection'
  }
];

// Project Portfolio / Case Studies
export const PROJECTS: Project[] = [
  {
    id: 'dxb-airport-t3',
    title: 'Dubai Airport Terminal 3 Concourse A Takeover',
    category: 'airports',
    categoryLabel: 'Airports',
    client: 'Emirates Group / Rolex',
    location: 'Dubai International Airport (DXB)',
    technology: 'Double-Sided Backlit Sublimation & Seamless Profiles',
    timeline: '3 Weeks (Including Airport-security installation)',
    outcome: '100% visual uniformity, night/day identical luminance, capturing 75 million annual premium travelers.',
    description: 'A prestigious, complete high-impact visual takeover across Terminal 3’s high-traffic concourse pillars and architectural bulkheads. Built with premium fire-retardant tension fabrics and custom lightbox integrations.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'sheikh-zayed-unipole',
    title: 'Sheikh Zayed Road Mega Unipole Landmark',
    category: 'billboards',
    categoryLabel: 'Billboards',
    client: 'Mina Media Network / Premium Luxury Brand',
    location: 'Sheikh Zayed Road (SZR), Dubai',
    technology: 'MMT Acrylic Paint Technology with Flexible Substrates',
    timeline: '10 Days production to installation',
    outcome: 'Zero fading or sand-blasting wear after 3 full years of continuous exposure in intense summer heat.',
    description: 'The single most visible outdoor unipole on SZR. Printed using our proprietary acrylic system to handle maximum wind velocity and constant high sun radiation.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'riyadh-boulevard-wrap',
    title: 'Riyadh Season Boulevard Building Wrap',
    category: 'wraps',
    categoryLabel: 'Building Wraps',
    client: 'General Entertainment Authority (GEA), Saudi Arabia',
    location: 'Riyadh Boulevard City, KSA',
    technology: 'Seamless Sonic Welding on Wind-Permeable Mesh',
    timeline: '18 Days from structural design to rig completion',
    outcome: 'Stunning visual backdrop for the GCC’s largest entertainment festival, structurally secure under variable desert winds.',
    description: 'A colossal 4,200 square-meter architectural wrap covering a multi-story retail facade. Made with micro-mesh apertures to maintain building ventilation and interior light levels while displaying incredible high-definition visuals.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dubai-mall-luxury-retail',
    title: 'The Dubai Mall Luxury Avenue Facade',
    category: 'retail',
    categoryLabel: 'Retail',
    client: 'Emaar Properties / Chanel',
    location: 'The Dubai Mall, UAE',
    technology: 'Dye Sublimation Textile & Acrylic Accents',
    timeline: '5 Days (Overnight delivery to avoid mall operating hours)',
    outcome: 'Flawless close-up visual fidelity with rich luxury branding texture, increasing store footfall by 32%.',
    description: 'High-end fabric banners, backlit storefront panels, and custom-tension columns for Chanel’s season launch. Features fully saturated deep blacks and perfect alignment across multi-surface structures.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567401893930-7beb7b1890f8?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'cop28-un-summit',
    title: 'COP28 UAE United Nations Summit Branding',
    category: 'government',
    categoryLabel: 'Government',
    client: 'Ministry of Climate Change and Environment / UN COP28',
    location: 'Expo City Dubai, UAE',
    technology: 'Eco-Friendly Bio-Substrates & Solvent-Free Curing',
    timeline: '25 Days full summit layout',
    outcome: 'Meets highest international ESG parameters, providing fully recyclable, stunning backdrop graphics for world leaders.',
    description: 'The official visual branding framework of COP28, featuring 100% biodegradable and zero-plastic fabric structures. Strict color compliance to UN branding directives and extreme speed-to-scale coordination.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'yas-marina-f1-grand-prix',
    title: 'Yas Marina Formula 1 Grand Prix Branding',
    category: 'events',
    categoryLabel: 'Events',
    client: 'Abu Dhabi Motorsports Management',
    location: 'Yas Marina Circuit, Abu Dhabi',
    technology: 'Heavy-Duty Reinforced Tension Banners',
    timeline: '14 Days precision track-side rigging',
    outcome: 'Crystal-clear broadcasting clarity on global 4K feeds. Perfect stretch alignment around complex barrier curves.',
    description: 'Trackside banners, podium backdrops, bridge wraps, and spectator stand takeovers for the final event of the Formula 1 calendar. Calibrated to avoid glare under high-power stadium track floodlighting.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Regions Served Configuration
export const COUNTRIES_SERVED: CountryServed[] = [
  {
    id: 'uae',
    name: 'United Arab Emirates',
    coordinates: { x: 50, y: 48 },
    projectsCount: '450+ Projects',
    details: 'MMT Regional HQ, holding premier airport lightboxes in Dubai & Abu Dhabi, alongside mega-billboards on major arterial expressways.'
  },
  {
    id: 'ksa',
    name: 'Saudi Arabia',
    coordinates: { x: 38, y: 55 },
    projectsCount: '380+ Projects',
    details: 'Operations in Riyadh, Jeddah, and Dammam. Specializing in Riyadh Season building wraps, giga-project developments, and institutional graphics.'
  },
  {
    id: 'egy',
    name: 'Egypt',
    coordinates: { x: 12, y: 52 },
    projectsCount: '120+ Projects',
    details: 'Providing massive outdoor advertising arrays across Cairo, airport branding within Cairo International, and coastal summer campaigns.'
  },
  {
    id: 'jor',
    name: 'Jordan',
    coordinates: { x: 20, y: 38 },
    projectsCount: '75+ Projects',
    details: 'Serving national telecom takeovers in Amman, retail branding for prestigious luxury malls, and regional tourism campaigns.'
  },
  {
    id: 'mar',
    name: 'Morocco',
    coordinates: { x: 3, y: 65 },
    projectsCount: '40+ Projects',
    details: 'Serving North African airport hubs, national banks, and modern retail properties in Casablanca and Marrakech.'
  },
  {
    id: 'lbn',
    name: 'Lebanon',
    coordinates: { x: 23, y: 31 },
    projectsCount: '60+ Projects',
    details: 'Delivering scenic outdoor installations, mall activations, and lifestyle retail takeovers in Beirut.'
  },
  {
    id: 'mlt',
    name: 'Malta',
    coordinates: { x: 8, y: 25 },
    projectsCount: '30+ Projects',
    details: 'Our Mediterranean gateway, printing specialized maritime materials, hotel facade wrap systems, and airport activations.'
  }
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Tareq Al-Mansoori',
    role: 'Director of Marketing & Media Partnerships',
    company: 'Emaar Properties',
    text: 'MMT MENA is the only media partner we trust with our premium developments. Their double-sided backlit prints stay visually striking and perfectly saturated during hot summers. True B2B alignment.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    avatarBg: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 't2',
    name: 'Sarah Gauthier',
    role: 'Head of Global Retail Design',
    company: 'Chanel Middle East',
    text: 'Our brand requires extreme color fidelity; even a slight shift in tone degrades the luxury vibe. MMT’s spectrophotometer color profiling achieves flawless Delta-E tolerances overnight.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    avatarBg: 'bg-indigo-950/40 text-indigo-400 border-indigo-500/20'
  },
  {
    id: 't3',
    name: 'Eng. Khalid Al-Harbi',
    role: 'Director of Visual Communication',
    company: 'General Entertainment Authority, KSA',
    text: 'For the Riyadh Boulevard wrapping, wind loads and security clearances were immense. MMT delivered structural mesh that is completely seamless and beautifully translucent from inside.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80',
    avatarBg: 'bg-cyan-950/40 text-cyan-400 border-cyan-500/20'
  },
  {
    id: 't4',
    name: 'Hassan Al-Saeed',
    role: 'Chief Operations Officer',
    company: 'Mina Media Network',
    text: 'Our long-standing highway billboard campaigns are subjected to continuous desert sandstorms. MMT’s acrylic paint technology survives without fade or cracks for years, slashing print replacement costs.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    avatarBg: 'bg-blue-950/40 text-blue-400 border-blue-500/20'
  }
];

// Tech Comparison Items
export interface ComparisonItem {
  feature: string;
  traditional: string;
  mmt: string;
  isWinner: boolean;
}

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: 'Maximum Seamless Print Width',
    traditional: 'Up to 3.2 meters (Requires seaming)',
    mmt: '5.2 Meters Seamless (Unlimited with sonic welding)',
    isWinner: true
  },
  {
    feature: 'UV Fade Resistance',
    traditional: '6 - 12 Months under harsh GCC summer',
    mmt: '10 Years Warranty (Molecularly bonded acrylic paint)',
    isWinner: true
  },
  {
    feature: 'Color Integrity at Night',
    traditional: 'Washed out or pale under bright backlighting',
    mmt: 'Double-Sided perfect alignment (Front/Back synchronized)',
    isWinner: true
  },
  {
    feature: 'Material Weather Durability',
    traditional: 'Cracks, chips, or stretches under 50°C temperatures',
    mmt: 'Elastomeric formulation with UV thermal insulation',
    isWinner: true
  },
  {
    feature: 'Eco-Friendly Curing & VOCs',
    traditional: 'High-emission solvent ink release during curing',
    mmt: '100% Water-based acrylic, zero-VOC UV dry tunnels',
    isWinner: true
  },
  {
    feature: 'Joinery Point Strength',
    traditional: 'Glued or stitched seams prone to high-wind tearing',
    mmt: 'Invisible electromagnetic sonic weld (98% tensile strength)',
    isWinner: true
  }
];

// Video Gallery data (Premium demo list)
export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
  description: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'MMT Mega Facility Drone Tour & Robotics Floor',
    duration: '2:45',
    thumbnail: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    category: 'Facility Tour',
    description: 'Fly through our state-of-the-art 15,000 sqm production hub. Watch our massive continuous rotatory paint drums and ultrasonic welding stations.'
  },
  {
    id: 'v2',
    title: 'Proprietary Double-Sided Lightbox Registration Test',
    duration: '1:30',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    category: 'R&D Labs',
    description: 'Demonstrating how computer cameras calibrate the dual-side printing to 0.1mm tolerance, achieving beautiful color depth in any lighting conditions.'
  },
  {
    id: 'v3',
    title: 'The SZR Mega Unipole - 3 Years Exposure Time-Lapse',
    duration: '3:15',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    category: 'Case Studies',
    description: 'Time-lapse photography showing our proprietary acrylic paint billboard on Dubai’s busiest highway surviving 3 harsh summers without loss of gloss.'
  }
];

// Industries Served List
export const INDUSTRIES = [
  { name: 'Advertising Networks', icon: 'Megaphone' },
  { name: 'Government Entities', icon: 'ShieldCheck' },
  { name: 'Real Estate Developers', icon: 'Building2' },
  { name: 'Luxury Retail Brands', icon: 'Sparkles' },
  { name: 'Airport Aviation Hubs', icon: 'PlaneTakeoff' },
  { name: 'Hospitality & Hotels', icon: 'Hotel' },
  { name: 'Automotive Networks', icon: 'Car' },
  { name: 'Telecommunications', icon: 'Wifi' },
  { name: 'Elite Sports & Events', icon: 'Trophy' },
  { name: 'Premium Shopping Malls', icon: 'ShoppingBag' }
];
