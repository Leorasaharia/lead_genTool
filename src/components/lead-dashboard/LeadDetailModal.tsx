
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/types/lead';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  ExternalLink,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {lead.companyName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Company Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{lead.industry}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{lead.location}</span>
                </div>
                {lead.employeeCount && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{lead.employeeCount} employees</span>
                  </div>
                )}
                {lead.revenue && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{lead.revenue}</span>
                  </div>
                )}
              </div>
            </div>

            {lead.description && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{lead.description}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                {lead.contactPerson && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{lead.contactPerson}</p>
                      {lead.contactTitle && (
                        <p className="text-sm text-gray-600">{lead.contactTitle}</p>
                      )}
                    </div>
                  </div>
                )}

                {lead.email && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {lead.isValidEmail ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">Unverified</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {lead.phone && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {lead.isValidPhone ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">Unverified</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {lead.website && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>{lead.website}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(lead.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Lead Score</h3>
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(lead.score).split(' ')[0]}`}>
                  {lead.score}%
                </div>
                <p className="text-sm text-gray-600">AI-powered relevance score</p>
              </div>
            </div>

            {lead.bbbRating && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">BBB Rating</h4>
                <div className="flex items-center">
                  <div className="text-lg font-bold text-blue-600">
                    {lead.bbbRating}/5
                  </div>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (lead.bbbRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Add to CRM
                </Button>
                <Button className="w-full" variant="outline">
                  Mark as Contacted
                </Button>
                <Button className="w-full" variant="outline">
                  Add to Favorites
                </Button>
              </div>
            </div>

            {lead.lastActivity && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Last Activity</span>
                </div>
                <p className="text-sm text-gray-600">{lead.lastActivity}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Export Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
