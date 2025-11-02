/**
 * Customer Data Type Definitions
 *
 * This module contains all the type definitions related to customer data,
 * including their contact information and personal details.
 */

/**
 * Address information for a customer
 * Supports multiple address types and full postal details
 */
export interface Address {
  /** Unique identifier for the address */
  id: string;
  /** Type of address (Home, Business, or Mailing) */
  type: 'Home' | 'Business' | 'Mailing';
  /** Street address including house/apartment number */
  street: string;
  /** City name */
  city: string;
  /** State or province */
  state: string;
  /** Postal/ZIP code */
  zipCode: string;
}

/**
 * Phone contact information for a customer
 * Supports multiple phone numbers with primary designation
 */
export interface Phone {
  /** Unique identifier for the phone contact */
  id: string;
  /** Type of phone number */
  type: 'Mobile' | 'Home' | 'Work';
  /** Phone number in standard format */
  number: string;
  /** Whether this is the customer's primary phone contact */
  isPrimary: boolean;
}

/**
 * Email contact information for a customer
 * Supports multiple email addresses with primary designation
 */
export interface Email {
  /** Unique identifier for the email contact */
  id: string;
  /** Type of email address */
  type: 'Personal' | 'Work';
  /** Email address */
  address: string;
  /** Whether this is the customer's primary email contact */
  isPrimary: boolean;
}

/**
 * Main customer interface containing all customer information
 * Includes personal details and contact information collections
 */
export interface Customer {
  /** Unique identifier for the customer */
  id: string;
  /** Customer's first name */
  firstName: string;
  /** Customer's last name */
  lastName: string;
  /** Customer's date of birth in ISO format */
  dateOfBirth: string;
  /** Customer's current marital status */
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  /** Secure identifier for sensitive operations */
  secureId: string;
  /** List of all customer addresses */
  addresses: Address[];
  /** List of all customer phone numbers */
  phones: Phone[];
  /** List of all customer email addresses */
  emails: Email[];
}
