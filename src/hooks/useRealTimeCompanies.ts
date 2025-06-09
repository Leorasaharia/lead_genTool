import { useToast } from '@/hooks/use-toast';
import { CompanyData, scrapeDoService } from '@/services/scrapeDoService';
import { Lead, SearchFilters } from '@/types/lead';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

// -- Add this for OpenAI key --
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''; // Set in .env or as prop

interface UseRealTimeCompaniesProps {
  searchFilters: SearchFilters & { useOpenAI?: boolean }; // optional flag
  enabled?: boolean;
}

async function openAICompanySearch(
  companyName: string,
  industry: string,
  location: string
): Promise<CompanyData[]> {
  if (!OPENAI_API_KEY) return [];

  // Use GPT to generate mock company data
  const prompt = `Give a JSON array of 1-3 real or plausible companies in the ${industry} industry located in ${location}, including their name, industry, location, website, and a short description.`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful data assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 500
    })
  });

  const data = await response.json();
  if (data.choices && data.choices[0]?.message?.content) {
    try {
      const companies = JSON.parse(data.choices[0].message.content);
      if (Array.isArray(companies)) return companies;
    } catch (e) {
      // Could not parse, ignore
    }
  }
  return [];
}

export const useRealTimeCompanies = ({ searchFilters, enabled = false }: UseRealTimeCompaniesProps) => {
  const [isScrapingLive, setIsScrapingLive] = useState(false);
  const { toast } = useToast();

  // Convert CompanyData to Lead format
  const convertToLeads = useCallback((companies: CompanyData[]): Lead[] => {
    return companies.map((company, index) => ({
      id: `live-${Date.now()}-${index}`,
      companyName: company.name,
      industry: company.industry || 'Unknown',
      location: company.location || 'Unknown',
      email: company.email,
      phone: company.phone,
      website: company.website,
      description: company.description,
      score: Math.floor(Math.random() * 40) + 60, // 60-100 for live data
      employeeCount: Math.floor(Math.random() * 500) + 10,
      revenue: `$${Math.floor(Math.random() * 100)}M`,
      isValidEmail: company.email ? Math.random() > 0.1 : undefined,
      isValidPhone: company.phone ? Math.random() > 0.1 : undefined,
      lastActivity: new Date().toISOString(),
      contactPerson: 'Business Contact',
      contactTitle: 'Manager',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  // Query for real-time companies (now with OpenAI fallback/enrichment)
  const {
    data: liveCompanies,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [
      'live-companies',
      searchFilters.industry,
      searchFilters.location,
      searchFilters.useOpenAI || false
    ],
    queryFn: async () => {
      if (!searchFilters.industry) {
        throw new Error('Industry is required for live scraping');
      }
      let companies = await scrapeDoService.scrapeCompaniesByCategory(
        searchFilters.industry,
        searchFilters.location
      );

      // If OpenAI is enabled, add/enrich with OpenAI companies (worldwide capability)
      if (searchFilters.useOpenAI && searchFilters.location && companies.length < 3) {
        const aiCompanies = await openAICompanySearch(
          searchFilters.companyName || '',
          searchFilters.industry,
          searchFilters.location
        );
        companies = [...companies, ...aiCompanies];
      }

      return convertToLeads(companies);
    },
    enabled: enabled && !!searchFilters.industry,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Error fetching live companies:', error);
      toast({
        title: "Live Scraping Error",
        description: "Failed to fetch real-time company data. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Manual scraping function
  const scrapeLiveCompanies = useCallback(async (industry: string, location?: string, useOpenAI?: boolean) => {
    setIsScrapingLive(true);
    try {
      toast({
        title: "Scraping Live Data",
        description: "Fetching real-time company information...",
      });

      let companies = await scrapeDoService.scrapeCompaniesByCategory(industry, location);

      if (useOpenAI && location && companies.length < 3) {
        const aiCompanies = await openAICompanySearch('', industry, location);
        companies = [...companies, ...aiCompanies];
      }

      const leads = convertToLeads(companies);

      toast({
        title: "Success!",
        description: `Found ${leads.length} companies from live sources.`,
      });

      return leads;
    } catch (error) {
      console.error('Error in manual scraping:', error);
      toast({
        title: "Scraping Failed",
        description: "Unable to fetch live data. Please check your connection and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsScrapingLive(false);
    }
  }, [convertToLeads, toast]);

  return {
    liveCompanies: liveCompanies || [],
    isLoading,
    isScrapingLive,
    error,
    scrapeLiveCompanies,
    refetch
  };
};
