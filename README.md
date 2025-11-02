# Customer Search Portal

A configurable customer search application built with React, TypeScript, and Shadcn/UI components. The application provides a dynamic search interface for finding customer records with strict matching criteria.

## Features

- Dynamic form field generation based on configuration
- Strict search matching for accurate results
- Responsive table display of search results
- Type-safe configuration and components
- Modern UI with smooth transitions and loading states

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- JSON Server (for backend API)

### Installation

1. Clone the repository
```bash
git clone https://github.com/mukulchauuhan/Customer-Search-Portal.git
cd Customer-Search-Portal
npm install
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the JSON Server (backend)
```bash
json-server --watch db.json --port 3001
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## Configuration Approach

The application uses a configuration-driven approach for managing search fields and results display. The main configuration is located in `src/config/searchConfig.ts`.

### Key Configuration Files

- `searchConfig.ts`: Defines the structure of search fields and results display
- `customerService.ts`: Handles API interactions
- `DynamicFormField.tsx`: Renders form fields based on configuration

### Configuration Structure

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    // Search form field configurations
    firstName: {
      uiType: 'input',
      label: 'First Name',
      renderOrder: 1,
      placeholder: 'Enter first name',
      required: true
    },
    // ... other fields
  },
  results: {
    // Result table column configurations
    name: {
      label: 'Name',
      renderOrder: 1,
      accessor: (customer) => `${customer.firstName} ${customer.lastName}`,
    },
    // ... other columns
  }
};
```

## Adding a New Search Field

To add a new search field:

1. Update the `SearchParams` interface in `src/services/customerService.ts`:
```typescript
export interface SearchParams {
  // Add your new field
  newField: string;
}
```

2. Add the field configuration in `src/config/searchConfig.ts`:
```typescript
fields: {
  newField: {
    uiType: 'input', // or 'date', 'select'
    label: 'New Field',
    renderOrder: 4, // Adjust order as needed
    placeholder: 'Enter value',
    required: true
  }
}
```

3. Add result column configuration (if needed):
```typescript
results: {
  newField: {
    label: 'New Field',
    renderOrder: 4,
    accessor: (customer) => customer.newField,
  }
}
```

## Design Decisions and Trade-offs That I took:

### 1. Strict Search Implementation
- All search fields are required for exact matching
- Trade-off: Less flexibility but more accurate results
- Reason: Business requirement for precise customer identification

### 2. Configuration-Driven Approach
- Benefits:
  - Easy to add/modify search fields
  - Centralized configuration
  - Type-safe field definitions
- Trade-offs:
  - More initial setup
  - More complex configuration file

### 3. Date Handling
- Backend stores dates in yyyy-mm-dd format
- Frontend displays dates in locale-specific format
- Trade-off: Additional date format conversion but better user experience

### 4. Dynamic Form Generation
- Benefits:
  - Consistent UI across fields
  - Reduced code duplication
- Trade-offs:
  - Less control over individual field behavior
  - More complex component logic

## Tech Stack

- React + TypeScript
- Vite for build tooling
- Shadcn/UI for components
- TanStack Query for data fetching
- JSON Server for mock backend

## Future Improvements

- Add field validation messages
- Support partial matching options
- Add sorting and pagination for results
- Implement advanced search filters
- Add export functionality for search results
