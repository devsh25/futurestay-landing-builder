import { PageData } from './types';
import { DEFAULT_TOKENS } from './designTokens';

export const DEFAULT_PAGE_DATA: PageData = {
  pageName: 'FutureStay Landing Page',
  pageSlug: 'direct-booking-website',
  hubspotPageId: null,

  designTokens: DEFAULT_TOKENS,

  header: {
    logoUrl: '',
    primaryCtaText: 'Start Free Trial',
    primaryCtaUrl: 'https://app.futurestay.com/signup',
    secondaryCtaText: 'Book a Call',
    secondaryCtaUrl: 'https://calendly.com/futurestay',
    sticky: true,
  },

  hero: {
    headline: "It's Time to Own Your Bookings",
    subtext: 'Create your direct booking website in minutes. Keep 100% of your revenue. Get found on Google Vacation Rentals.',
    primaryCtaText: 'Start Your Free Trial',
    primaryCtaUrl: 'https://app.futurestay.com/signup',
    secondaryCtaText: 'Book a Call',
    secondaryCtaUrl: 'https://calendly.com/futurestay',
    trustBadges: [
      { icon: '\u2713', text: '14-day free trial' },
      { icon: '\u2713', text: 'No credit card required' },
      { icon: '\u2713', text: 'Setup in 5 minutes' },
    ],
    heroImageUrl: '',
  },

  socialProofBar: {
    enabled: true,
    badges: [
      { imageUrl: '', text: 'Official Airbnb & Google Partner' },
      { imageUrl: '', text: '4.5/5 Google Rating' },
    ],
  },

  partnerLogos: {
    enabled: true,
    logos: [
      { name: 'Booking.com', imageUrl: '' },
      { name: 'AirDNA', imageUrl: '' },
      { name: 'Vrbo', imageUrl: '' },
      { name: 'Google', imageUrl: '' },
      { name: 'Hopper', imageUrl: '' },
      { name: 'Turno', imageUrl: '' },
    ],
  },

  steps: {
    enabled: true,
    sectionTitle: '3 Simple Steps to Direct Bookings',
    steps: [
      {
        stepNumber: '1',
        title: 'Import Your Listing',
        description: 'Connect your Airbnb account and import your property in one click. Your listing details, photos, and calendar sync automatically.',
      },
      {
        stepNumber: '2',
        title: 'Customize Your Site',
        description: 'Your professional direct booking website is created instantly. Customize your branding, policies, and pricing.',
      },
      {
        stepNumber: '3',
        title: 'Launch & Get Bookings',
        description: 'Go live on Google Vacation Rentals and start receiving commission-free direct bookings from day one.',
      },
    ],
  },

  stats: {
    enabled: true,
    stats: [
      { value: '$6,000', label: 'Average Annual Savings' },
      { value: '5 min', label: 'Average Setup Time' },
      { value: '1,000+', label: 'Direct Booking Websites' },
      { value: '27%', label: 'More Revenue Per Booking' },
    ],
  },

  features: {
    enabled: true,
    sectionTitle: 'Everything You Need for Successful Direct Bookings',
    features: [
      {
        title: 'Google Vacation Rentals Integration',
        description: 'Get listed on Google Vacation Rentals with one click. 70% of travelers start their search on Google \u2014 be where your guests are looking.',
        imageUrl: '',
      },
      {
        title: 'Automated Guest Messaging',
        description: 'Pre-built lifecycle messages that go out automatically at every stage \u2014 from booking confirmation to checkout follow-up.',
        imageUrl: '',
      },
      {
        title: 'Guest Verification & Protection',
        description: 'Built-in booking protection and risk management on every direct booking. Flag high-risk reservations automatically.',
        imageUrl: '',
      },
      {
        title: 'Channel Sync',
        description: 'Always-synced calendars across all your channels. No double bookings, no manual updates.',
        imageUrl: '',
      },
      {
        title: 'Dynamic Pricing (AI-Powered)',
        description: 'Smart Pricing powered by AirDNA analyzes market data, seasonality, and demand patterns to optimize your rates automatically.',
        imageUrl: '',
      },
      {
        title: 'Mobile-Optimized Booking',
        description: 'Your direct booking site is fully responsive and optimized for mobile guests who book on the go.',
        imageUrl: '',
      },
    ],
  },

  testimonials: {
    enabled: true,
    sectionTitle: 'Join 1,000+ Hosts Earning More with Direct Bookings',
    testimonials: [
      {
        quote: 'FutureStay made it so easy to get my own booking website. I was up and running in less than 10 minutes, and I\'ve already saved hundreds in commissions.',
        authorName: 'Caroline G.',
        authorTitle: 'Vacation Rental Host',
        rating: 5,
      },
    ],
  },

  comparison: {
    enabled: true,
    sectionTitle: 'See How FutureStay Compares',
    columns: ['Feature', 'FutureStay', 'Airbnb / VRBO', 'Hospitable'],
    rows: [
      { feature: 'Commission', values: ['0%', '15-20%', '0% + $40/mo'] },
      { feature: 'Direct Booking Website', values: ['Included', 'N/A', 'Not Included'] },
      { feature: 'Google Vacation Rentals', values: ['1-Click Setup', 'N/A', 'Not Included'] },
      { feature: 'Smart Pricing', values: ['AI-Powered', 'Basic', 'Not Included'] },
      { feature: 'Guest Protection', values: ['Built-In', 'Platform Only', 'Not Included'] },
      { feature: 'Airbnb Import', values: ['1-Click Import', 'N/A', 'Manual Setup'] },
      { feature: 'Monthly Cost', values: ['$25 Flat Fee', '15-20% per booking', '$40+/mo'] },
    ],
  },

  ctaSection: {
    enabled: true,
    headline: 'Ready to Own Your Bookings?',
    subtext: 'Start your free 14-day trial today. No credit card required.',
    ctaText: 'Start Your Free 14-Day Trial',
    ctaUrl: 'https://app.futurestay.com/signup',
    testimonial: {
      quote: 'I wish I had found FutureStay sooner. The direct booking website pays for itself every single month.',
      authorName: 'William Johnson',
      authorTitle: 'Property Owner',
      rating: 5,
    },
  },

  faq: {
    enabled: true,
    sectionTitle: 'Frequently Asked Questions',
    items: [
      {
        question: 'How does FutureStay work with my Airbnb listing?',
        answer: 'FutureStay connects to Airbnb via their official API. Your listing is imported read-only \u2014 zero risk to your existing bookings or search ranking. You can then create a direct booking website that works alongside Airbnb.',
      },
      {
        question: 'Do I need any technical skills to get started?',
        answer: 'Not at all. Our famous 5-minute onboarding guides you through everything. Import your listing, customize your site, and launch \u2014 no coding or design skills needed.',
      },
      {
        question: 'How much does FutureStay cost?',
        answer: 'FutureStay is just $25/month with a 14-day free trial. No commissions, no hidden fees. You keep 100% of your booking revenue.',
      },
      {
        question: 'What is Google Vacation Rentals?',
        answer: 'Google Vacation Rentals is the largest direct booking discovery engine on the internet. When travelers search for vacation rentals on Google, your property can appear directly in search results \u2014 commission-free.',
      },
      {
        question: 'How do I get on Google Vacation Rentals?',
        answer: 'With FutureStay, it\u2019s one click. We handle all the technical requirements, feed management, and sync. Your listing goes live on Google within days of launching.',
      },
      {
        question: 'What happens after my 14-day trial?',
        answer: 'After your trial, your subscription continues at $25/month. You can cancel anytime. Your direct booking website stays live as long as your subscription is active.',
      },
      {
        question: 'Do I need to leave Airbnb to use FutureStay?',
        answer: 'No! FutureStay works alongside Airbnb. Keep your Airbnb listing performing while building your direct booking channel. Over time, your best guests will book directly.',
      },
      {
        question: 'How do I accept payments on my direct booking site?',
        answer: 'FutureStay integrates with Stripe for secure payment processing. Connect your bank account, and guests can pay directly \u2014 with fast payouts and zero commission.',
      },
      {
        question: 'Is there customer support if I need help?',
        answer: 'Absolutely. Our team is here to help you succeed. You can book a call anytime, and we offer hands-on onboarding support to get you launched.',
      },
    ],
  },

  footer: {
    phone: '(555) 123-4567',
    email: 'hello@futurestay.com',
    copyrightText: '\u00a9 2026 FutureStay. All rights reserved.',
    socialLinks: {
      facebook: 'https://facebook.com/futurestay',
      instagram: 'https://instagram.com/futurestay',
      twitter: 'https://twitter.com/futurestay',
      youtube: 'https://youtube.com/futurestay',
      linkedin: 'https://linkedin.com/company/futurestay',
    },
  },
};
