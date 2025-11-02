/**
 * Customer Service Module:
 * Handles all customer-related API interactions.
 * Supports searching customers based on various criteria (First Name, Last Name, Date of Birth).
 */

import { Customer } from '@/types/customer';

// Base URL for the customer API endpoints
const API_BASE_URL = 'http://localhost:3001';

/**
 * Interface defining the possible search parameters
 * I took all fields as optional to allow flexible search criteria
 */
export interface SearchParams {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

/**
 * Search for customers based on provided criteria
 * Requires all search parameters for exact matching
 *
 * @param params - Search parameters (firstName, lastName, dateOfBirth)
 * @returns Promise resolving to an array of matching customers
 * @throws Error if the API request fails
 */
export const searchCustomers = async (params: SearchParams): Promise<Customer[]> => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  if (!response.ok) throw new Error('Failed to fetch customers');

  const data: Customer[] = await response.json();

  return data.filter(c => {
    const first = c.firstName?.trim().toLowerCase() || '';
    const last = c.lastName?.trim().toLowerCase() || '';
    const paramFirst = params.firstName?.trim().toLowerCase() || '';
    const paramLast = params.lastName?.trim().toLowerCase() || '';

    // Normalize dates to yyyy-mm-dd
    const dob = c.dateOfBirth
      ? new Date(c.dateOfBirth).toISOString().split('T')[0]
      : '';

    const paramDob =
      params.dateOfBirth && !isNaN(new Date(params.dateOfBirth).getTime())
        ? new Date(params.dateOfBirth).toISOString().split('T')[0]
        : '';

    // Exact match for all three fields
    return (
      first === paramFirst &&
      last === paramLast &&
      dob === paramDob
    );
  });
};
