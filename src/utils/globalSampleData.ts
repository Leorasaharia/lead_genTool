
import { Lead } from '@/types/lead';

// Global locations from major cities worldwide
const globalLocations = [
  // Asia-Pacific
  'Manila, Philippines',
  'Bangkok, Thailand',
  'Singapore',
  'Jakarta, Indonesia',
  'Kuala Lumpur, Malaysia',
  'Ho Chi Minh City, Vietnam',
  'Mumbai, India',
  'Bangalore, India',
  'Delhi, India',
  'Shanghai, China',
  'Beijing, China',
  'Shenzhen, China',
  'Tokyo, Japan',
  'Osaka, Japan',
  'Seoul, South Korea',
  'Sydney, Australia',
  'Melbourne, Australia',
  'Auckland, New Zealand',
  
  // Europe
  'London, United Kingdom',
  'Manchester, United Kingdom',
  'Berlin, Germany',
  'Munich, Germany',
  'Paris, France',
  'Lyon, France',
  'Amsterdam, Netherlands',
  'Stockholm, Sweden',
  'Copenhagen, Denmark',
  'Oslo, Norway',
  'Helsinki, Finland',
  'Zurich, Switzerland',
  'Vienna, Austria',
  'Madrid, Spain',
  'Barcelona, Spain',
  'Rome, Italy',
  'Milan, Italy',
  'Warsaw, Poland',
  'Prague, Czech Republic',
  'Budapest, Hungary',
  'Dublin, Ireland',
  'Brussels, Belgium',
  'Lisbon, Portugal',
  
  // North America
  'San Francisco, CA, USA',
  'New York, NY, USA',
  'Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Austin, TX, USA',
  'Seattle, WA, USA',
  'Boston, MA, USA',
  'Miami, FL, USA',
  'Toronto, ON, Canada',
  'Vancouver, BC, Canada',
  'Montreal, QC, Canada',
  
  // South America
  'São Paulo, Brazil',
  'Rio de Janeiro, Brazil',
  'Buenos Aires, Argentina',
  'Santiago, Chile',
  'Lima, Peru',
  'Bogotá, Colombia',
  'Caracas, Venezuela',
  
  // Middle East & Africa
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Riyadh, Saudi Arabia',
  'Tel Aviv, Israel',
  'Istanbul, Turkey',
  'Cairo, Egypt',
  'Lagos, Nigeria',
  'Cape Town, South Africa',
  'Johannesburg, South Africa',
  'Nairobi, Kenya',
  'Casablanca, Morocco'
];

const industries = [
  'Healthcare',
  'Technology',
  'Financial Services',
  'Manufacturing',
  'Education',
  'Retail',
  'Real Estate',
  'Telecommunications',
  'Energy',
  'Transportation',
  'Hospitality',
  'Media & Entertainment',
  'Construction',
  'Pharmaceutical',
  'Automotive',
  'Agriculture',
  'Food & Beverage',
  'Legal Services',
  'Consulting',
  'Marketing & Advertising',
  'Insurance',
  'Government',
  'Non-profit',
  'Aerospace',
  'Biotechnology',
  'E-commerce',
  'Gaming',
  'Fintech',
  'Edtech',
  'Healthtech'
];

const companyNamePrefixes = [
  'Global', 'International', 'Digital', 'Smart', 'Advanced', 'Premier', 'Elite',
  'Innovative', 'Modern', 'Future', 'Next', 'Pro', 'Tech', 'Mega', 'Ultra',
  'Prime', 'Alpha', 'Beta', 'Apex', 'Summit', 'Peak', 'Vertex', 'Core',
  'Central', 'Metro', 'Urban', 'Regional', 'National', 'Universal'
];

const companyNameSuffixes = [
  'Solutions', 'Systems', 'Technologies', 'Services', 'Group', 'Corp',
  'Industries', 'Enterprises', 'Company', 'Inc', 'Ltd', 'Partners',
  'Associates', 'Consulting', 'Labs', 'Works', 'Studio', 'Hub',
  'Center', 'Institute', 'Foundation', 'Network', 'Platform', 'Ventures'
];

const emailDomains = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'business.co',
  'corp.net', 'enterprise.org', 'global.com', 'international.biz'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateCompanyName(): string {
  const prefix = getRandomItem(companyNamePrefixes);
  const suffix = getRandomItem(companyNameSuffixes);
  return `${prefix} ${suffix}`;
}

function generateEmail(companyName: string): string {
  const domain = getRandomItem(emailDomains);
  const localPart = companyName.toLowerCase().replace(/\s+/g, '').substring(0, 10);
  return `contact@${localPart}.${domain.split('.')[1]}`;
}

function generatePhoneNumber(location: string): string {
  // Generate realistic phone numbers based on location
  if (location.includes('USA') || location.includes('Canada')) {
    return `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('Philippines')) {
    return `+63-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('Singapore') || location.includes('Malaysia')) {
    return `+65-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('United Kingdom')) {
    return `+44-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 900000 + 100000)}`;
  } else if (location.includes('Germany')) {
    return `+49-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000000 + 1000000)}`;
  } else if (location.includes('India')) {
    return `+91-${Math.floor(Math.random() * 90000 + 10000)}-${Math.floor(Math.random() * 90000 + 10000)}`;
  } else if (location.includes('China')) {
    return `+86-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('Japan')) {
    return `+81-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('Australia')) {
    return `+61-${Math.floor(Math.random() * 9 + 1)}-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('Brazil')) {
    return `+55-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90000 + 10000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (location.includes('UAE')) {
    return `+971-${Math.floor(Math.random() * 9 + 1)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else {
    // Generic international format
    return `+${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }
}

function generateWebsite(companyName: string): string {
  const domain = companyName.toLowerCase().replace(/\s+/g, '').substring(0, 15);
  const extensions = ['.com', '.co', '.net', '.org', '.io', '.tech'];
  return `https://www.${domain}${getRandomItem(extensions)}`;
}

export function generateGlobalSampleLeads(count: number): Lead[] {
  const leads: Lead[] = [];

  for (let i = 0; i < count; i++) {
    const companyName = generateCompanyName();
    const industry = getRandomItem(industries);
    const location = getRandomItem(globalLocations);
    const score = Math.floor(Math.random() * 100);
    const hasEmail = Math.random() > 0.2;
    const hasPhone = Math.random() > 0.3;
    const hasWebsite = Math.random() > 0.1;

    const lead: Lead = {
      id: `lead-${i + 1}`,
      companyName,
      industry,
      location,
      email: hasEmail ? generateEmail(companyName) : undefined,
      phone: hasPhone ? generatePhoneNumber(location) : undefined,
      website: hasWebsite ? generateWebsite(companyName) : undefined,
      score,
      employeeCount: Math.floor(Math.random() * 1000) + 1,
      revenue: `$${Math.floor(Math.random() * 100)}M`,
      description: `${companyName} is a leading ${industry.toLowerCase()} company based in ${location}, providing innovative solutions to clients worldwide.`,
      isValidEmail: hasEmail ? Math.random() > 0.2 : undefined,
      isValidPhone: hasPhone ? Math.random() > 0.15 : undefined,
      lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      contactPerson: `${getRandomItem(['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Emma', 'James', 'Maria'])} ${getRandomItem(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'])}`,
      contactTitle: getRandomItem(['CEO', 'CTO', 'CFO', 'VP Sales', 'Director', 'Manager', 'Head of Business Development']),
      bbbRating: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : undefined,
      linkedinUrl: Math.random() > 0.4 ? `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, '-')}` : undefined,
      tags: Math.random() > 0.6 ? [getRandomItem(['High Priority', 'Qualified', 'Hot Lead', 'Enterprise', 'SMB'])] : undefined,
      notes: Math.random() > 0.7 ? 'Initial contact made via email. Follow up scheduled.' : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString()
    };

    leads.push(lead);
  }

  return leads;
}
