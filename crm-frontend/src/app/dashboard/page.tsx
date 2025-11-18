
import AddEntry from "./addEntry"

async function getCustomerData() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseURL) {
      throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set.");
  }
  //Fetch data from customers API route
  const response = await fetch(`${baseURL}/api/customers`, {
    // Use the base URL configured for your dev environment
    cache: 'no-store' 
  }); 

  if (!response.ok) {
    throw new Error('Failed to fetch data from internal API.');
  }

  return response.json();
}


export default async function DashboardPage() {
  // Fetch customer data from the internal API route
  let customers: any[] = [];
  try {
    customers = await getCustomerData();
  } catch (error) {
    console.error(error);
    // You might render an error message here
    return <div>Error loading data. Check console.</div>;
  }
  
  return (
    <div>
      <h1>Customer Dashboard</h1>
      {/* 💡 The 'customers' variable now holds the JSON data */}
      <pre>{JSON.stringify(customers, null, 2)}</pre>
      {/* You can now iterate over 'customers' to render your table */}
      <AddEntry />
    </div>
  );
}