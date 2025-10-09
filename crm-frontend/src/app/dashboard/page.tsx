import client from '../../lib/db';
import Link from 'next/link';

interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  last_contacted: string;
  notes: string;
  status: string;
}

export default async function Home() {
  let customers: Customer[] = [];
  try {
    const result = await client.query('SELECT * FROM customers');
    customers = result.rows;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>ID: {customer.customer_id}   ||
          NAME: {customer.first_name} {customer.last_name}    ||
          EMAIL: {customer.email}   ||
          PHONE NUMBER: {customer.phone_number}  || 
          ADDRESS: {customer.address}   ||
          LAST CONTACTED: {customer.last_contacted}   ||
          NOTES: {customer.notes}   ||
          STATUS: {customer.status}</li>
        ))}
      </ul>
    </div>
  );
}