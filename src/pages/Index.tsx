import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { SearchResults } from '@/components/SearchResults';
import { Customer } from '@/types/customer';
import { searchCustomers, SearchParams } from '@/services/customerService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    setCustomers([]); // Clear search results
    setError(null); // Clear any errors
    setHasSearched(false); // Reset search state
  };

  const handleSearch = async (params: SearchParams) => {

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchCustomers(params);
      setCustomers(results);

      if (results.length === 0 && Object.keys(params).length > 0) {
        toast({
          title: "No results found",
          description: "Try adjusting your search criteria",
        });
      }
    } catch (err) {
      const errorMessage = 'Failed to search customers. Please ensure JSON Server is running on port 3001.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Search failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Customer Search Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and manage customer information efficiently
          </p>
        </div>

        <div className="space-y-8">
          <SearchForm
            onSearch={handleSearch}
            onReset={handleReset}
            isLoading={isLoading}
          />
          <SearchResults
            customers={customers}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
