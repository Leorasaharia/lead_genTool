
import React, { useState, useEffect } from 'react';
import { SearchForm } from '@/components/lead-dashboard/SearchForm';
import { ResultsTable } from '@/components/lead-dashboard/ResultsTable';
import { FilterSidebar } from '@/components/lead-dashboard/FilterSidebar';
import { LeadDetailModal } from '@/components/lead-dashboard/LeadDetailModal';
import { DashboardHeader } from '@/components/lead-dashboard/DashboardHeader';
import { StatsCards } from '@/components/lead-dashboard/StatsCards';
import { generateGlobalSampleLeads } from '@/utils/globalSampleData';
import { Lead, SearchFilters } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Menu, X, RefreshCw, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    industry: '',
    location: '',
    companyName: '',
    keywords: '',
    minScore: 0,
    hasEmail: false,
    hasPhone: false,
    hasWebsite: false,
    companySize: 'all'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Initialize with sample data on component mount
  useEffect(() => {
    console.log('Initializing with global sample data...');
    const sampleLeads = generateGlobalSampleLeads(500);
    setAllLeads(sampleLeads);
  }, []);

  useEffect(() => {
    // Apply client-side filtering to all leads
    let filtered = [...allLeads];

    if (searchFilters.industry) {
      filtered = filtered.filter(lead => 
        lead.industry.toLowerCase().includes(searchFilters.industry.toLowerCase())
      );
    }

    if (searchFilters.location) {
      filtered = filtered.filter(lead => 
        lead.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    if (searchFilters.companyName) {
      filtered = filtered.filter(lead => 
        lead.companyName.toLowerCase().includes(searchFilters.companyName.toLowerCase())
      );
    }

    if (searchFilters.keywords) {
      filtered = filtered.filter(lead => 
        lead.description?.toLowerCase().includes(searchFilters.keywords.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(searchFilters.keywords.toLowerCase())
      );
    }
    
    if (searchFilters.minScore > 0) {
      filtered = filtered.filter(lead => lead.score >= searchFilters.minScore);
    }
    
    if (searchFilters.hasEmail) {
      filtered = filtered.filter(lead => lead.email);
    }
    
    if (searchFilters.hasPhone) {
      filtered = filtered.filter(lead => lead.phone);
    }
    
    if (searchFilters.hasWebsite) {
      filtered = filtered.filter(lead => lead.website);
    }
    
    if (searchFilters.companySize !== 'all') {
      filtered = filtered.filter(lead => {
        const size = lead.employeeCount || 0;
        switch (searchFilters.companySize) {
          case 'startup': return size <= 10;
          case 'small': return size > 10 && size <= 50;
          case 'medium': return size > 50 && size <= 250;
          case 'large': return size > 250;
          default: return true;
        }
      });
    }

    setFilteredLeads(filtered);
  }, [allLeads, searchFilters]);

  const handleSearch = (filters: SearchFilters) => {
    console.log('Search triggered with filters:', filters);
    setSearchFilters(filters);
  };

  const handleGenerateNewData = async () => {
    setIsGenerating(true);
    try {
      toast({
        title: "Generating New Data",
        description: "Creating fresh sample leads...",
      });

      // Generate new sample data
      const newLeads = generateGlobalSampleLeads(500);
      setAllLeads(newLeads);
      
      toast({
        title: "Success!",
        description: "Generated new sample leads data.",
      });
    } catch (error) {
      console.error('Error generating new data:', error);
      toast({
        title: "Error",
        description: "Failed to generate new data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simply re-apply filters to existing data
      setSearchFilters({ ...searchFilters });
      toast({
        title: "Data Refreshed",
        description: "Lead data has been refreshed.",
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: "Error", 
        description: "Failed to refresh data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Company Name', 'Industry', 'Location', 'Email', 'Phone', 'Website', 'Score'],
      ...filteredLeads.map(lead => [
        lead.companyName,
        lead.industry,
        lead.location,
        lead.email || '',
        lead.phone || '',
        lead.website || '',
        lead.score.toString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads-export.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Global Lead Generation Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Discover, validate, and export high-quality business leads from companies worldwide
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleRefreshData}
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={handleGenerateNewData}
                variant="default"
                size="sm"
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Database className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-pulse' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate New Data'}
              </Button>
            </div>
          </div>
        </div>

        <StatsCards leads={filteredLeads} />

        <div className="grid grid-cols-12 gap-6">
          {/* Mobile Filter Toggle */}
          <div className="col-span-12 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full"
            >
              {sidebarOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
              {sidebarOpen ? 'Close Filters' : 'Open Filters'}
            </Button>
          </div>

          {/* Sidebar */}
          <div className={`col-span-12 lg:col-span-3 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              filters={searchFilters}
              onFiltersChange={handleSearch}
              totalLeads={allLeads.length}
              filteredLeads={filteredLeads.length}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <SearchForm onSearch={handleSearch} isLoading={isLoading || isGenerating} />
            
            <ResultsTable
              leads={filteredLeads}
              isLoading={isLoading || isGenerating}
              selectedLeads={selectedLeads}
              onSelectedLeadsChange={setSelectedLeads}
              onLeadClick={setSelectedLead}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
};

export default Index;
