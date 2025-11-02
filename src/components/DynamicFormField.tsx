/**
 * DynamicFormField Component
 *
 * A flexible form field component that renders different input types based on configuration.
 * This component is a core part of our dynamic form system, allowing us to create
 * configurable search forms without writing specific components for each field type.
 *
 * Supports multiple field types:
 * - Text input
 * - Date input
 * - Select dropdown with configurable options
 */

import { FieldConfig } from '@/config/searchConfig';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Props interface for the component
interface DynamicFormFieldProps {
  fieldKey: string;
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
}

export const DynamicFormField = ({ fieldKey, config, value, onChange }: DynamicFormFieldProps) => {
  // Helper function to render the appropriate field based on the configuration
  const renderField = () => {
    switch (config.uiType) {
      // Standard text input field with smooth focus transition
      case 'input':
        return (
          <Input
            id={fieldKey}
            type="text"
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="transition-all duration-200 focus:shadow-md"
          />
        );

      // Date input field with native date picker
      case 'date':
        return (
          <Input
            id={fieldKey}
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="transition-all duration-200 focus:shadow-md"
          />
        );

      // Dropdown select field with custom styling and animation
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="transition-all duration-200 focus:shadow-md">
              <SelectValue placeholder={config.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {/* Map through provided options to create select items */}
              {config.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  // Render the complete form field with label and optional required indicator
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldKey} className="text-sm font-medium text-foreground">
        {config.label}
        {/* Added a red asterisk for required fields */}
        {config.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};
