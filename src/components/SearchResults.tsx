/**
 * SearchResults Component
 *
 * A responsive component that displays customer search results in a tabular format.
 * Handles multiple display states including loading, error, empty results, and data display.
 *
 * Features:
 * - Dynamic table column configuration via searchConfig
 * - Responsive error handling
 * - Loading state visualization
 * - Empty state handling
 * - Sortable columns based on configuration
 * - Accessible table structure
 */

import { Customer } from '@/types/customer';
import { searchConfig } from '@/config/searchConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Users, AlertCircle } from 'lucide-react';

// Props interface defining the component's required properties
interface SearchResultsProps {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export const SearchResults = ({ customers, isLoading, error, hasSearched }: SearchResultsProps) => {
  // Sort table columns based on their configured render order
  const sortedResultFields = Object.entries(searchConfig.results).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  // Display loading state with animated spinner
  if (isLoading) {
    return (
      <Card className="shadow-lg border-border">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Searching customers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error message if search request failed
  if (error) {
    return (
      <Alert variant="destructive" className="shadow-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Initial state before any search is performed
  if (!hasSearched) {
    return (
      <Card className="shadow-lg border-border">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Enter search criteria above to find customers</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show empty state when search returns no results
  if (customers.length === 0) {
    return (
      <Card className="shadow-lg border-border">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No customers found matching your criteria</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render search results in a table format
  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">Search Results</CardTitle>
        <CardDescription className="text-muted-foreground">
          {/* Display result count with proper pluralization */}
          Found {customers.length} customer{customers.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            {/* Table header with configurable columns */}
            <TableHeader>
              <TableRow className="bg-muted/50">
                {sortedResultFields.map(([key, config]) => (
                  <TableHead key={key} className="font-semibold text-foreground">
                    {config.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {/* Table body with dynamic customer data */}
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="hover:bg-muted/30 transition-colors duration-150"
                >
                  {/* Render each cell using the configured accessor function */}
                  {sortedResultFields.map(([key, config]) => (
                    <TableCell key={key} className="text-foreground">
                      {config.accessor(customer)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
