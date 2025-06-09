
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchFilters } from '@/types/lead';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [filters, setFilters] = useState<SearchFilters>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                Industry
              </Label>
              <Input
                id="industry"
                placeholder="e.g., Healthcare, Technology"
                value={filters.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Manila, Philippines or Tokyo, Japan"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="companyName"
                placeholder="e.g., Global Solutions Inc"
                value={filters.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">
                Keywords
              </Label>
              <Input
                id="keywords"
                placeholder="e.g., startup, enterprise, B2B"
                value={filters.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search Global Leads
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
