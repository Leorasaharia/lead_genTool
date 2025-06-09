import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar, Camera, Download, Edit, Mail, Shield, Star, User } from 'lucide-react';
import React, { useState } from 'react';

export const UserProfile = () => {
  const { user, updateProfile, uploadAvatar, isLoading } = useUser();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
    company: user?.company || '',
    bio: user?.bio || '',
    location: user?.location || '',
    timezone: user?.timezone || ''
  });

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file);
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated.",
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Failed to upload avatar. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'pro':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Button variant="ghost\" size="sm\" disabled>
        <User className="w-4 h-4 animate-pulse" />
      </Button>
    );
  }

  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>
            Manage your account settings and preferences
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-lg">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                          <Camera className="w-6 h-6 text-white" />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.title}</p>
                      <Badge className={getPlanColor(user.subscription.plan)}>
                        {user.subscription.plan.toUpperCase()} Plan
                      </Badge>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editForm.name : user.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editForm.email : user.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={isEditing ? editForm.title : user.title || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={isEditing ? editForm.company : user.company || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={isEditing ? editForm.location : user.location || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={isEditing ? editForm.bio : user.bio || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Account Info */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Account Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Joined {format(user.joinDate, 'MMM yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Preferences</CardTitle>
                  <CardDescription>Customize your search experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Industries</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.industries.map((industry) => (
                        <Badge key={industry} variant="secondary">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Regions</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.regions.map((region) => (
                        <Badge key={region} variant="secondary">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Frequency</Label>
                    <Select value={user.preferences.emailFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Subscription Details</CardTitle>
                  </div>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">{user.subscription.plan.toUpperCase()} Plan</h3>
                      {user.subscription.expiresAt && (
                        <p className="text-sm text-muted-foreground">
                          Expires on {format(user.subscription.expiresAt, 'MMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                    <Badge className={getPlanColor(user.subscription.plan)}>
                      Active
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Included Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {user.subscription.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      Manage Billing
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};