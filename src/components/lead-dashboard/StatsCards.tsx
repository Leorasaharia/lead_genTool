
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/lead';
import { TrendingUp, Users, CheckCircle, Target } from 'lucide-react';

interface StatsCardsProps {
  leads: Lead[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const highScoreLeads = leads.filter(lead => lead.score >= 80).length;
  const validatedEmails = leads.filter(lead => lead.isValidEmail).length;
  const averageScore = leads.length > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) : 0;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'High-Quality Leads',
      value: highScoreLeads.toLocaleString(),
      icon: Target,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Validated Emails',
      value: validatedEmails.toLocaleString(),
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+5%',
      changeColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="flex items-center">
              <Badge variant="secondary" className={`text-xs ${stat.changeColor} bg-transparent p-0`}>
                {stat.change} from last month
              </Badge>
            </div>
          </CardContent>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
            index === 0 ? 'from-blue-500 to-blue-600' :
            index === 1 ? 'from-emerald-500 to-emerald-600' :
            index === 2 ? 'from-purple-500 to-purple-600' :
            'from-orange-500 to-orange-600'
          }`} />
        </Card>
      ))}
    </div>
  );
};
