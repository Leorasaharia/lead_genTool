
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Lead } from '@/types/lead';
import { ExternalLink, Mail, Phone, Globe, CheckCircle, XCircle, Download, Star } from 'lucide-react';

interface ResultsTableProps {
  leads: Lead[];
  isLoading: boolean;
  selectedLeads: string[];
  onSelectedLeadsChange: (leadIds: string[]) => void;
  onLeadClick: (lead: Lead) => void;
  onExport: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  leads,
  isLoading,
  selectedLeads,
  onSelectedLeadsChange,
  onLeadClick,
  onExport
}) => {
  const [sortField, setSortField] = useState<keyof Lead>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectedLeadsChange(leads.map(lead => lead.id));
    } else {
      onSelectedLeadsChange([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      onSelectedLeadsChange([...selectedLeads, leadId]);
    } else {
      onSelectedLeadsChange(selectedLeads.filter(id => id !== leadId));
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Searching for leads...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-600" />
            Lead Results ({leads.length})
          </CardTitle>
          <div className="flex items-center space-x-2">
            {selectedLeads.length > 0 && (
              <Badge variant="secondary">
                {selectedLeads.length} selected
              </Badge>
            )}
            <Button
              onClick={onExport}
              variant="outline"
              size="sm"
              disabled={leads.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                  />
                </th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('companyName')}
                >
                  Company
                </th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('industry')}
                >
                  Industry
                </th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('location')}
                >
                  Location
                </th>
                <th className="p-4 text-left">Contact</th>
                <th 
                  className="p-4 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('score')}
                >
                  Score
                </th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <tr 
                  key={lead.id}
                  className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onLeadClick(lead);
                  }}
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, Boolean(checked))}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{lead.companyName}</p>
                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {lead.industry}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-600">{lead.location}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {lead.email && (
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 text-gray-400 mr-1" />
                          {lead.isValidEmail ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          {lead.isValidPhone ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getScoreColor(lead.score)} border-0`}>
                      {lead.score}%
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLeadClick(lead);
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {leads.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-500 space-y-2">
              <p className="text-lg font-medium">No leads found</p>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
