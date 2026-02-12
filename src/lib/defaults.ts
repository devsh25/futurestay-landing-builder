import { PageData } from './types';
import { DEFAULT_TOKENS } from './designTokens';

export const DEFAULT_PAGE_DATA: PageData = {
  pageName: 'FutureStay Direct Booking Website',
  pageSlug: 'direct-booking-website',
  hubspotPageId: null,

  designTokens: DEFAULT_TOKENS,

  header: {
    logoUrl: 'https://hello.futurestay.com/hubfs/logo_blue.svg',
    primaryCtaText: 'Start 14-Day Free Trial',
    primaryCtaUrl: 'https://app.futurestay.com/signup',
    secondaryCtaText: 'Sign Up with Airbnb',
    secondaryCtaUrl: 'https://app.futurestay.com/signup?source=airbnb',
    sticky: true,
  },

  hero: {
    headline: 'Build Your Direct Booking Website for Vacation Rentals',
    subtext: 'Create your commission-free Airbnb direct booking website in minutes. Keep 100% of your bookings.',
    primaryCtaText: 'Start 14-Day Free Trial',
    primaryCtaUrl: 'https://app.futurestay.com/signup',
    secondaryCtaText: 'Sign Up with Airbnb',
    secondaryCtaUrl: 'https://app.futurestay.com/signup?source=airbnb',
    trustBadges: [
      { icon: '\u2713', text: 'Launch in 5 Minutes' },
      { icon: '\u2713', text: 'No Hidden Fees' },
      { icon: '\u2713', text: 'Cancel Anytime' },
    ],
    heroImageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/FY-23/Frame-3357.webp?width=1408&height=1290&name=Frame-3357.webp',
  },

  socialProofBar: {
    enabled: true,
    badges: [
      { imageUrl: 'https://hello.futurestay.com/hubfs/airnb-google.svg', text: 'Official Airbnb & Google Partner' },
      { imageUrl: 'https://hello.futurestay.com/hubfs/google-icon.svg', text: '4.5/5 Google Rating' },
    ],
  },

  partnerLogos: {
    enabled: true,
    logos: [
      { name: 'Google', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/FY-23/logoFriendly_google.png?width=105&height=34&name=logoFriendly_google.png' },
      { name: 'Airbnb', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/FY-23/logoFriendly_airbnb-1.png?width=190&height=60&name=logoFriendly_airbnb-1.png' },
      { name: 'Hopper', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/Fy-24/Logos/hopper.png?width=285&height=77&name=hopper.png' },
      { name: 'Stripe', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/Fy-24/Logos/stripe.png?width=168&height=72&name=stripe.png' },
      { name: 'AirDNA', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/FY-23/logoFriendly_airdna.png?width=109&height=17&name=logoFriendly_airdna.png' },
      { name: 'Waivo', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/Fy-24/Logos/waivo.png?width=263&height=76&name=waivo.png' },
      { name: 'Turno', imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/Fy-24/Logos/turno.png?width=238&height=58&name=turno.png' },
    ],
  },

  steps: {
    enabled: true,
    sectionTitle: 'Use Our Direct Booking Website Builder To Create Your Site',
    steps: [
      {
        stepNumber: '1',
        title: 'Import',
        description: 'Connect your Airbnb account and import property details, photos, amenities, and pricing with a few clicks.',
        iconUrl: 'https://hello.futurestay.com/hubfs/Import.svg',
      },
      {
        stepNumber: '2',
        title: 'Personalize',
        description: 'Add custom pages, policies, and your unique style to your direct booking website.',
        iconUrl: 'https://hello.futurestay.com/hubfs/Customize.svg',
      },
      {
        stepNumber: '3',
        title: 'Launch',
        description: 'Go live with your commission-free direct booking website for vacation rentals and reach millions of travelers on Google Vacation Rentals.',
        iconUrl: 'https://hello.futurestay.com/hubfs/Launch.svg',
      },
    ],
  },

  stats: {
    enabled: true,
    stats: [
      { value: '95,000+', label: 'Commission-Free Direct Booking Websites Created' },
      { value: '$6,000', label: 'Average Annual Commission Saved per Property' },
      { value: '27%', label: 'More Revenue from Multi-Channel Distribution' },
      { value: '5 min', label: 'Average Time to Launch Your Direct Booking Website' },
    ],
  },

  features: {
    enabled: true,
    sectionTitle: 'The Best Direct Booking Platform for Vacation Rentals',
    features: [
      {
        title: 'Google Vacation Rentals',
        description: 'List on Google Vacation Rentals through official partner integration to reach millions of travelers searching for rentals.',
        imageUrl: '',
      },
      {
        title: 'Real-Time Calendar Sync',
        description: 'Two-way sync with Airbnb, VRBO, and Booking.com. Update once, reflect everywhere\u2014eliminating double bookings.',
        imageUrl: '',
      },
      {
        title: 'Dynamic Pricing',
        description: 'Maximize revenue by 20-40% with AI-powered pricing that adjusts rates based on demand, competition, and seasonality.',
        imageUrl: '',
      },
      {
        title: 'Automated Guest Messaging',
        description: 'Save 20+ hours weekly with automated emails that handle confirmations, check-in instructions, and review requests.',
        imageUrl: '',
      },
      {
        title: 'Direct Booking Protection',
        description: 'Accept direct bookings with confidence using built-in fraud detection and damage protection at no extra cost.',
        imageUrl: '',
      },
      {
        title: 'Mobile-Optimized Booking',
        description: 'Capture the 72% of travelers who book on mobile with a fully responsive direct booking website optimized for fast conversions.',
        imageUrl: '',
      },
    ],
  },

  testimonials: {
    enabled: true,
    sectionTitle: 'Why Hosts Call FutureStay the Best Direct Booking Website Builder',
    testimonials: [
      {
        quote: 'They made me feel that my little BnB was as important to them as a huge resort. The details that made my listing better were so helpful.',
        authorName: 'K.W.',
        authorTitle: 'BnB Owner',
        rating: 5,
      },
      {
        quote: 'As soon as I made the updates he requested, I received two additional bookings. I am 85% booked for the summer season.',
        authorName: 'T.G.',
        authorTitle: 'Vacation Rental Host',
        rating: 5,
      },
      {
        quote: "I'm completely new to short-term rentals, and while my head is spinning with all the details of physically setting up my properties, the kind people at Futurestay have patiently walked me through onboarding and a review and they have built my confidence that I can do this!",
        authorName: 'B.B.',
        authorTitle: 'New Host',
        rating: 5,
      },
      {
        quote: 'As someone who has been hosting a year and a half having FutureStay has been a game changer for me. If you want to up your game and maximize your short and mid term rental game it is worth the investment.',
        authorName: 'L.M.',
        authorTitle: 'Owns 1 unit, Atlanta, GA',
        rating: 5,
      },
    ],
  },

  comparison: {
    enabled: true,
    sectionTitle: 'FutureStay vs Airbnb vs Hospitable: Direct Booking Website Comparison',
    columns: ['Feature', 'FutureStay', 'Airbnb/VRBO', 'Hospitable'],
    rows: [
      { feature: 'Dynamic Pricing (AI)', values: ['AirDNA + PriceLabs Integrations', 'Basic tools', 'Available'] },
      { feature: 'Customer Support', values: ['Dedicated Account Manager', 'Limited support', 'Email support'] },
      { feature: 'Airbnb Import', values: ['1-Click Import', 'Not Available', 'Available'] },
      { feature: 'Setup Time', values: ['5 minutes', '1-2 hours', '30+ minutes'] },
      { feature: 'Instant Booking', values: ['Available', 'Available', 'Premium Feature'] },
      { feature: 'Guest Protection', values: ['$25 Flat Fee', 'Limited by AirCover', 'Premium Feature'] },
      { feature: 'Google Vacation Rentals', values: ['Official Partner', 'Not Available', 'Premium Feature'] },
      { feature: 'Commission Fees', values: ['0% + Stripe processing', '15-20% per booking', '1-4% + processing'] },
    ],
  },

  ctaSection: {
    enabled: true,
    headline: 'Ready to Build Your Airbnb Direct Booking Website?',
    subtext: 'Create your commission-free direct booking website in minutes and keep 100% of your revenue.',
    ctaText: 'Launch My Direct Booking Website',
    ctaUrl: 'https://app.futurestay.com/signup',
    imageUrl: 'https://hello.futurestay.com/hs-fs/hubfs/futurestay_cabin_rental_owner-min.webp',
    testimonial: null,
  },

  faq: {
    enabled: true,
    sectionTitle: 'Direct Booking Website FAQ:',
    items: [
      {
        question: 'Who is Futurestay?',
        answer: 'FutureStay is the essential tool for rental entrepreneurs (rentalpreneurs). We provide everything you need to build and manage your direct booking website, including payment processing, reservation management, and distribution to Google Vacation Rentals.',
      },
      {
        question: 'What type of properties does Futurestay support?',
        answer: 'FutureStay supports whole homes including houses, cabins, cottages, condos, apartments, and similar properties. We currently do not support shared spaces, campsites, boats, or RVs.',
      },
      {
        question: 'Does Futurestay support international properties?',
        answer: 'FutureStay currently serves properties in the US, Puerto Rico, Mexico, and Canada. We have an international waitlist for hosts in other countries.',
      },
      {
        question: 'How to create a direct booking website with Futurestay?',
        answer: 'Simply answer a few questions, and our builder handles the rest. You can import your Airbnb listing or start from scratch. Your direct booking website will be enabled for Google Vacation Rentals and commission-free bookings.',
      },
      {
        question: 'What is Smart Rates?',
        answer: 'Smart Rates is our AI-powered dynamic pricing tool, powered by AirDNA, that analyzes over 10 million global rentals. It provides personalized rate suggestions to optimize your revenue and increase bookings by 20-40%.',
      },
      {
        question: 'What is Google Vacation Rentals?',
        answer: "Google Vacation Rentals is Google's feature that allows users to search and book vacation rentals directly from Google Search. As an official partner, FutureStay can list your property on Google Vacation Rentals commission-free.",
      },
      {
        question: 'Is Futurestay integrated with Airbnb?',
        answer: 'Yes! FutureStay has a direct integration with Airbnb via their official API. This provides real-time synchronization of rates, calendars, and property configurations.',
      },
      {
        question: 'Can I work with Futurestay without Airbnb?',
        answer: 'Absolutely. Many hosts use FutureStay purely for direct bookings integrated with Google Vacation Rentals. The only feature that requires Airbnb is Smart Rates. You can sync other channels via iCal.',
      },
      {
        question: 'Can I use Futurestay with VRBO, Booking.com, etc.?',
        answer: 'Yes! FutureStay has direct integrations with Airbnb and Google. For other platforms like VRBO, Booking.com, and more, we support iCal integration to keep your calendars in sync.',
      },
    ],
  },

  footer: {
    phone: '(888) 885-3439',
    email: 'connect@futurestay.com',
    copyrightText: '\u00a9 2026 FutureStay. All rights reserved.',
    socialLinks: {
      facebook: 'https://facebook.com/futurestay',
      instagram: 'https://instagram.com/futurestay',
      twitter: '',
      youtube: 'https://youtube.com/futurestay',
      linkedin: 'https://linkedin.com/company/futurestay',
    },
  },
};
