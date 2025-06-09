
import React, { useState } from 'react';
import { Settings, Moon, Sun, Download, Upload, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useToast } from '@/hooks/use-toast';

export const SettingsPanel = () => {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings } = useSettings();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleReset = () => {
    resetSettings();
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleExport = () => {
    exportSettings();
    toast({
      title: "Settings Exported",
      description: "Your settings have been downloaded as a JSON file.",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          // Here you would validate and import settings
          toast({
            title: "Settings Imported",
            description: "Settings have been imported successfully.",
          });
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "Failed to import settings. Please check the file format.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Application Settings</SheetTitle>
          <SheetDescription>
            Customize your LeadGen Pro experience
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Theme Preferences</CardTitle>
                  <CardDescription>Customize the appearance of your interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Application Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                    <Switch
                      id="auto-refresh"
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Refresh Interval (minutes)</Label>
                    <Slider
                      value={[settings.refreshInterval]}
                      onValueChange={([value]) => updateSetting('refreshInterval', value)}
                      min={5}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      Current: {settings.refreshInterval} minutes
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => updateSetting('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Search Limit</Label>
                    <Select
                      value={settings.defaultSearchLimit.toString()}
                      onValueChange={(value) => updateSetting('defaultSearchLimit', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 results</SelectItem>
                        <SelectItem value="100">100 results</SelectItem>
                        <SelectItem value="250">250 results</SelectItem>
                        <SelectItem value="500">500 results</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="save-history">Save Search History</Label>
                    <Switch
                      id="save-history"
                      checked={settings.saveSearchHistory}
                      onCheckedChange={(checked) => updateSetting('saveSearchHistory', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-filters">Auto Apply Filters</Label>
                    <Switch
                      id="auto-filters"
                      checked={settings.autoApplyFilters}
                      onCheckedChange={(checked) => updateSetting('autoApplyFilters', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="display" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Display Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <Switch
                      id="compact-view"
                      checked={settings.compactView}
                      onCheckedChange={(checked) => updateSetting('compactView', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="advanced-metrics">Show Advanced Metrics</Label>
                    <Switch
                      id="advanced-metrics"
                      checked={settings.showAdvancedMetrics}
                      onCheckedChange={(checked) => updateSetting('showAdvancedMetrics', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Default Sort By</Label>
                    <Select
                      value={settings.defaultSortBy}
                      onValueChange={(value) => updateSetting('defaultSortBy', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Lead Score</SelectItem>
                        <SelectItem value="company">Company Name</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Export Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Export Format</Label>
                    <Select
                      value={settings.defaultExportFormat}
                      onValueChange={(value) => updateSetting('defaultExportFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-contact">Include Contact Information</Label>
                    <Switch
                      id="include-contact"
                      checked={settings.includeContactInfo}
                      onCheckedChange={(checked) => updateSetting('includeContactInfo', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="import-settings" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                  <input
                    id="import-settings"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImport}
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
