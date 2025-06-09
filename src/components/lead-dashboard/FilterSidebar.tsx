
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/types/lead';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  totalLeads: number;
  filteredLeads: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  totalLeads,
  filteredLeads
}) => {
  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters: SearchFilters = {
      industry: '',
      location: '',
      companyName: '',
      keywords: '',
      minScore: 0,
      hasEmail: false,
      hasPhone: false,
      hasWebsite: false,
      companySize: 'all'
    };
    onFiltersChange(resetFilters);
  };

  return (
    <Card className="border-0 shadow-lg sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            Filters
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {filteredLeads} of {totalLeads} leads
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Minimum Score: {filters.minScore}%
          </Label>
          <Slider
            value={[filters.minScore]}
            onValueChange={(value) => handleFilterChange('minScore', value[0])}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Company Size</Label>
          <Select
            value={filters.companySize}
            onValueChange={(value) => handleFilterChange('companySize', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sizes</SelectItem>
              <SelectItem value="startup">Startup (1-10)</SelectItem>
              <SelectItem value="small">Small (11-50)</SelectItem>
              <SelectItem value="medium">Medium (51-250)</SelectItem>
              <SelectItem value="large">Large (250+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">Contact Information</Label>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="hasEmail" className="text-sm text-gray-600">
              Has Email
            </Label>
            <Switch
              id="hasEmail"
              checked={filters.hasEmail}
              onCheckedChange={(checked) => handleFilterChange('hasEmail', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="hasPhone" className="text-sm text-gray-600">
              Has Phone
            </Label>
            <Switch
              id="hasPhone"
              checked={filters.hasPhone}
              onCheckedChange={(checked) => handleFilterChange('hasPhone', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="hasWebsite" className="text-sm text-gray-600">
              Has Website
            </Label>
            <Switch
              id="hasWebsite"
              checked={filters.hasWebsite}
              onCheckedChange={(checked) => handleFilterChange('hasWebsite', checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>💡 <strong>Pro Tip:</strong> Use multiple filters to find the most relevant leads for your campaign.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
