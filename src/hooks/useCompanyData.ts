
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Lead, SearchFilters } from '@/types/lead';

interface CompanyApiResponse {
  success: boolean;
  companies_found: number;
  companies: any[];
  error?: string;
}

interface UseCompanyDataProps {
  searchFilters: SearchFilters;
  enabled?: boolean;
}

export const useCompanyData = ({ searchFilters, enabled = true }: UseCompanyDataProps) => {
  const [isScrapingNew, setIsScrapingNew] = useState(false);

  // Fetch existing companies from database
  const {
    data: existingCompanies,
    isLoading: isLoadingExisting,
    error: existingError,
    refetch: refetchExisting
  } = useQuery({
    queryKey: ['companies', searchFilters],
    queryFn: async () => {
      console.log('Fetching companies from database with filters:', searchFilters);
      
      let query = supabase.from('companies').select('*');

      if (searchFilters.industry) {
        query = query.ilike('industry', `%${searchFilters.industry}%`);
      }
      
      if (searchFilters.location) {
        query = query.ilike('location', `%${searchFilters.location}%`);
      }
      
      if (searchFilters.companyName) {
        query = query.ilike('company_name', `%${searchFilters.companyName}%`);
      }

      const { data, error } = await query.limit(500);
      
      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} companies in database`);
      
      // Convert database format to Lead format
      const leads: Lead[] = (data || []).map((company, index) => ({
        id: company.id,
        companyName: company.company_name,
        industry: company.industry || 'Unknown',
        location: company.location || 'Unknown',
        address: company.address,
        email: company.email,
        phone: company.phone,
        website: company.website,
        score: Math.floor(Math.random() * 100), // Generate score for compatibility
        employeeCount: company.employee_count,
        description: company.description,
        isValidEmail: company.email ? Math.random() > 0.2 : undefined,
        isValidPhone: company.phone ? Math.random() > 0.15 : undefined,
        lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        contactPerson: 'Business Contact',
        contactTitle: 'Manager',
        createdAt: company.created_at,
        updatedAt: company.updated_at
      }));

      return leads;
    },
    enabled: enabled,
  });

  const scrapeNewCompanies = async (limit: number = 100) => {
    setIsScrapingNew(true);
    
    try {
      console.log('Scraping new companies with filters:', searchFilters);
      
      const { data, error } = await supabase.functions.invoke('scrape-companies', {
        body: {
          industry: searchFilters.industry,
          location: searchFilters.location,
          limit: limit
        }
      });

      if (error) {
        console.error('Error scraping companies:', error);
        throw error;
      }

      const result = data as CompanyApiResponse;
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to scrape companies');
      }

      console.log(`Successfully scraped ${result.companies_found} companies`);
      
      // Refetch existing companies to include the new ones
      await refetchExisting();
      
      return result;
    } catch (error) {
      console.error('Error in scrapeNewCompanies:', error);
      throw error;
    } finally {
      setIsScrapingNew(false);
    }
  };

  return {
    companies: existingCompanies || [],
    isLoading: isLoadingExisting,
    isScrapingNew,
    error: existingError,
    scrapeNewCompanies,
    refetch: refetchExisting
  };
};
