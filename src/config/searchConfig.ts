/**
 * Configuration for search form fields
 * Defines the structure and behavior of form input fields
 */
export interface FieldConfig {
  /** Type of UI component to render ('input', 'date', or 'select') */
  uiType: 'input' | 'date' | 'select';
  /** Display label for the field */
  label: string;
  /** Order in which the field should be rendered (lower numbers first) */
  renderOrder: number;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Whether the field is required for form submission */
  required?: boolean;
  /** Options for select fields, each with a label and value */
  options?: Array<{ label: string; value: string }>;
}

/**
 * Configuration for search result table columns
 * Defines how customer data should be displayed in the results table
 */
export interface ResultFieldConfig {
  /** Display label for the column header */
  label: string;
  /** Order in which the column should appear (lower numbers first) */
  renderOrder: number;
  /** Function to extract and format the display value from a customer record */
  accessor: (customer: any) => string;
  /** Optional width specification for the column */
  width?: string;
}

/**
 * Main search configuration interface
 * Contains both form field and result display configurations
 */
export interface SearchConfig {
  /** Configuration for search form input fields */
  fields: Record<string, FieldConfig>;
  /** Configuration for search results table columns */
  results: Record<string, ResultFieldConfig>;
}

/**
 * Search configuration object
 * Defines the structure and behavior of the customer search interface
 */
export const searchConfig: SearchConfig = {
  fields: {
    firstName: {
      uiType: 'input',
      label: 'First Name',
      renderOrder: 1,
      placeholder: 'Enter first name',
      required: true,
    },
    lastName: {
      uiType: 'input',
      label: 'Last Name',
      renderOrder: 2,
      placeholder: 'Enter last name',
      required: true,
    },
    dateOfBirth: {
      uiType: 'date',
      label: 'Date of Birth',
      renderOrder: 3,
      placeholder: 'Select date',
      required: true,
    },
  },
  results: {
    name: {
      label: 'Name',
      renderOrder: 1,
      accessor: (customer: any) => `${customer.firstName} ${customer.lastName}`,
      width: 'w-1/4',
    },
    dateOfBirth: {
      label: 'Date of Birth',
      renderOrder: 2,
      accessor: (customer: any) => {
        const dob = customer.dateOfBirth
          ? new Date(customer.dateOfBirth).toISOString().split('T')[0]
          : '';
        return dob;
      },
      width: 'w-1/6',
    },
    primaryPhone: {
      label: 'Primary Phone',
      renderOrder: 3,
      accessor: (customer: any) => {
        const primary = customer.phones.find((p: any) => p.isPrimary);
        return primary ? primary.number : 'N/A';
      },
      width: 'w-1/5',
    },
    primaryEmail: {
      label: 'Primary Email',
      renderOrder: 4,
      accessor: (customer: any) => {
        const primary = customer.emails.find((e: any) => e.isPrimary);
        return primary ? primary.address : 'N/A';
      },
      width: 'w-1/3',
    },
  },
};
