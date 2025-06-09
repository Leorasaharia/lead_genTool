
export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedinUrl?: string;
  bbbRating?: number;
  score: number;
  employeeCount?: number;
  revenue?: string;
  description?: string;
  lastActivity?: string;
  contactPerson?: string;
  contactTitle?: string;
  isValidEmail?: boolean;
  isValidPhone?: boolean;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  industry: string;
  location: string;
  companyName: string;
  keywords: string;
  minScore: number;
  hasEmail: boolean;
  hasPhone: boolean;
  hasWebsite: boolean;
  companySize: 'all' | 'startup' | 'small' | 'medium' | 'large';
}

export interface LeadStats {
  totalLeads: number;
  highScoreLeads: number;
  validatedEmails: number;
  averageScore: number;
}
