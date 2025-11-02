/**
 * SearchForm Component
 *
 * A dynamic search interface that generates form fields based on searchConfig.
 * This component serves as the main search interface for the customer finder,
 * providing a flexible and user-friendly way to search for customers using
 * multiple criteria.
 *
 * Features:
 * - Dynamic field generation based on configuration
 * - Responsive grid layout
 * - Loading state handling
 * - Form reset functionality
 * - Automatic field ordering
 */

import { useState } from 'react';
import { searchConfig } from '@/config/searchConfig';
import { DynamicFormField } from './DynamicFormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchParams } from '@/services/customerService';
import { Search, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Props interface defining the component's required properties
interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  onReset: () => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, onReset, isLoading }: SearchFormProps) => {
  // State to store form field values
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Sort fields based on their configured render order for consistent layout
  const sortedFields = Object.entries(searchConfig.fields).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  /**
   * Handles form submission by preparing and filtering search parameters
   * Only includes non-empty fields in the search query
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing Required Fields",
        description: "Please fill in all required fields before searching.",
      });
      return;
    }

    // All fields are required for the search
    const searchParams: SearchParams = {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
    };

    onSearch(searchParams);
  };

  /**
   * Resets the form to its initial state and triggers a new search
   * with empty parameters
   */
  const handleReset = () => {
    setFormData({}); // Clear form fields
    onReset(); // Call the reset handler to clear results
  };

  /**
   * Updates the form state when a field value changes
   * Preserves existing values while updating the changed field
   */
  const handleFieldChange = (fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  // Render the search form with a card-based layout
  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">Search Customers</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter search criteria to find customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Responsive grid layout: single column on mobile, three columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render form fields in their specified order */}
            {sortedFields.map(([fieldKey, config]) => (
              <DynamicFormField
                key={fieldKey}
                fieldKey={fieldKey}
                config={config}
                value={formData[fieldKey] || ''}
                onChange={(value) => handleFieldChange(fieldKey, value)}
              />
            ))}
          </div>

          {/* Form action buttons with loading states and animations */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="shadow-md hover:shadow-lg transition-all duration-200"
            >
              {/* Dynamic button content based on loading state */}
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
            {/* Reset button to clear the form */}
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
              className="transition-all duration-200"
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
