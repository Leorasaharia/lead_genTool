
import { Lead } from '@/types/lead';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
  'Real Estate', 'Marketing', 'Consulting', 'SaaS', 'E-commerce', 'Legal',
  'Construction', 'Automotive', 'Food & Beverage', 'Entertainment'
];

const cities = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
  'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
  'Portland, OR', 'Nashville, TN', 'Raleigh, NC', 'Phoenix, AZ', 'Salt Lake City, UT'
];

const companyNames = [
  'TechFlow Solutions', 'InnovateX Corp', 'DataMind Analytics', 'CloudBridge Systems',
  'FinanceFirst LLC', 'HealthTech Innovations', 'EduSmart Platform', 'RetailBoost Co',
  'ManufacturingPro Inc', 'PropertyVision Group', 'MarketingGenius Agency', 'ConsultWise',
  'SaaSTech Ventures', 'E-CommerceHub', 'LegalEagle Partners', 'BuildTech Construction',
  'AutoDrive Solutions', 'FoodieConnect', 'EntertainmentPlus', 'GreenEnergy Systems'
];

const descriptions = [
  'Leading provider of innovative technology solutions for enterprise clients.',
  'Specializing in data analytics and business intelligence platforms.',
  'Cloud-based software solutions for modern businesses.',
  'Financial services and consulting for growing companies.',
  'Healthcare technology solutions improving patient outcomes.',
  'Educational platform revolutionizing online learning.',
  'Retail optimization and customer experience solutions.',
  'Advanced manufacturing technologies and automation.',
  'Real estate investment and property management services.',
  'Digital marketing and brand strategy consulting.',
  'Business consulting and process optimization.',
  'SaaS platform for team collaboration and productivity.',
  'E-commerce solutions and online marketplace development.',
  'Legal services and compliance consulting.',
  'Construction project management and building solutions.',
  'Automotive technology and smart vehicle systems.',
  'Food technology and supply chain optimization.',
  'Entertainment and media production services.',
  'Renewable energy solutions and sustainability consulting.',
  'Cybersecurity and data protection services.'
];

const contactNames = [
  'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson',
  'Lisa Anderson', 'James Brown', 'Jessica Taylor', 'Robert Martinez', 'Ashley White',
  'Christopher Lee', 'Amanda Garcia', 'Matthew Rodriguez', 'Nicole Thompson', 'Daniel Moore'
];

const contactTitles = [
  'CEO', 'CTO', 'VP of Sales', 'Marketing Director', 'Operations Manager',
  'Business Development Manager', 'Head of Marketing', 'Sales Director',
  'Product Manager', 'Chief Marketing Officer', 'General Manager', 'Founder'
];

const generateLeadScore = (): number => {
  // Generate scores with a bias toward higher values (70-95 range)
  const random = Math.random();
  if (random < 0.3) return Math.floor(Math.random() * 30) + 50; // 50-79
  if (random < 0.7) return Math.floor(Math.random() * 15) + 70; // 70-84
  return Math.floor(Math.random() * 15) + 85; // 85-99
};

const generateEmail = (companyName: string, contactName: string): string => {
  const company = companyName.toLowerCase().replace(/[^a-z]/g, '');
  const name = contactName.toLowerCase().replace(/[^a-z]/g, '');
  const domains = ['.com', '.io', '.co', '.net'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${company}${domain}`;
};

const generatePhone = (): string => {
  const area = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${exchange}-${number}`;
};

const generateWebsite = (companyName: string): string => {
  const company = companyName.toLowerCase().replace(/[^a-z]/g, '');
  const domains = ['.com', '.io', '.co', '.net'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `https://www.${company}${domain}`;
};

export const generateSampleLeads = (count: number): Lead[] => {
  const leads: Lead[] = [];

  for (let i = 0; i < count; i++) {
    const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    const contactName = contactNames[Math.floor(Math.random() * contactNames.length)];
    const contactTitle = contactTitles[Math.floor(Math.random() * contactTitles.length)];
    const score = generateLeadScore();
    
    // Generate contact info with some probability
    const hasEmail = Math.random() > 0.1; // 90% have email
    const hasPhone = Math.random() > 0.2; // 80% have phone
    const hasWebsite = Math.random() > 0.05; // 95% have website
    
    const lead: Lead = {
      id: `lead-${i + 1}`,
      companyName,
      industry,
      location,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'First St', 'Second Ave'][Math.floor(Math.random() * 5)]}`,
      email: hasEmail ? generateEmail(companyName, contactName) : undefined,
      phone: hasPhone ? generatePhone() : undefined,
      website: hasWebsite ? generateWebsite(companyName) : undefined,
      linkedinUrl: `https://linkedin.com/company/${companyName.toLowerCase().replace(/[^a-z]/g, '')}`,
      bbbRating: Math.random() > 0.3 ? Math.floor(Math.random() * 2) + 4 : undefined, // 4-5 stars or undefined
      score,
      employeeCount: Math.floor(Math.random() * 1000) + 10,
      revenue: ['$1M-$5M', '$5M-$10M', '$10M-$50M', '$50M+'][Math.floor(Math.random() * 4)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      lastActivity: ['2 days ago', '1 week ago', '2 weeks ago', '1 month ago'][Math.floor(Math.random() * 4)],
      contactPerson: contactName,
      contactTitle,
      isValidEmail: hasEmail ? Math.random() > 0.2 : undefined, // 80% valid if exists
      isValidPhone: hasPhone ? Math.random() > 0.15 : undefined, // 85% valid if exists
      tags: ['New Lead', 'High Priority', 'Follow Up'][Math.floor(Math.random() * 3)] ? [['New Lead', 'High Priority', 'Follow Up'][Math.floor(Math.random() * 3)]] : [],
      notes: Math.random() > 0.7 ? 'Interested in our premium package' : undefined,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    };

    leads.push(lead);
  }

  return leads.sort((a, b) => b.score - a.score); // Sort by score descending
};
